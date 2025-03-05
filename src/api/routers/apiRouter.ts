// Libraries
import express from 'express';
import rateLimit from 'express-rate-limit';
// Configs
import { upload } from '../config/uploadConfig';
// RabbitMQ
import { publishConversionJob } from '../rabbitMQ/queue/publishConversionJob';
// Redis
import { getConversionJob } from '../redis/stores/conversionJobStore';
import { subscribeForJob } from '../redis/subscribers/subscripeForJob';


const apiRouter = express.Router();
// Only for this endpoint otherwise could be extracted into config
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 1000,
    message: "Too many requests, please try again later.",
});

apiRouter.post('/convert-video', limiter, upload.single("file"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    
    try {
        const data = await publishConversionJob(req.file.filename);
        
        return res.status(200).json({success: true, data});
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ error: "Conversion failed" });
    }
})

apiRouter.get('/convert-video/status/:jobId', async (req, res) => {
    const jobId = req.params.jobId;

    try {
        const job = await getConversionJob(jobId);

        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        if (job.status === 'completed') {
            return res.json({data: job});
        }

        // Waiting for conversion data change for long polling
        const updatedData = await subscribeForJob(job)

        return res.json({ data: updatedData });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});



apiRouter.get('/health-check', (req, res) => res.send('healthy'));

export default apiRouter;
