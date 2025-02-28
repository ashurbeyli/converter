// Libraries
import express from 'express';
import rateLimit from 'express-rate-limit';
import axios from 'axios';
// Configs
import { upload } from '../config/uploadConfig';
// Utils


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
        // TODO: later extract hardcoded worker url into env variables
        const response = await axios.get('http://worker:3001/workers/converter', {
            params: {
                filename: req.file.filename
            }
        })
        return res.status(200).json(response?.data);
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ error: "Conversion failed" });
    }
})

apiRouter.get('/health-check', (req, res) => res.send('healthy'));

export default apiRouter;
