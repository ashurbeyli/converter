// Libraries
import express from 'express';
// Configs
import { upload } from '../config/uploadConfig';
// Services
import { convertMp4ToGif } from '../utils/converter';
// Utils
// import { broadcast } from '../utils/websocket'; // TODO: add socket feature


const apiRouter = express.Router();

apiRouter.post('/convert-video', upload.single("file"), async (req, res) => {
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

export default apiRouter;
