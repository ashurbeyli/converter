import express from 'express';

// Utils
import { convertMp4ToGif } from './utils/convertMp4toGif';

// Constants
const PORT = 3001;
const app = express();

// Middlewares
app.use(express.json());

// Routes
app.get('/workers/converter', async (req, res) => {
    const { filename } = req.query;
    
    if (!filename) {
        return res.status(400).json({ error: 'Missing filePath parameter' });
    }

    try {
        const file = await convertMp4ToGif(filename);
        return res.status(200).json({success: true, file});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
});

app.listen(PORT, () => {
    console.log(`Converter Worker is running on port ${PORT} with env: ${process.env['NODE_ENV']}`);
});
