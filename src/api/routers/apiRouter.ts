// Libraries
import express from 'express';
import rateLimit from "express-rate-limit";
// Configs
import { upload } from '../config/uploadConfig';
// Services
import { convertMp4ToGif } from '../utils/converter';
// Utils
// import { broadcast } from '../utils/websocket'; // TODO: add socket feature


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
        const outputFilename = await convertMp4ToGif(req.file.path);
        // broadcast({ status: "completed", file: outputFilename });
        return res.json({ success: true, file: outputFilename });
    } catch (error: any) {
        // broadcast({ status: "error", message: error?.message });
        return res.status(500).json({ error: "Conversion failed" });
    }
})

apiRouter.get('/health-check', (req, res) => res.send('healthy'));

export default apiRouter;
