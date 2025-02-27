import express from 'express';

const apiRouter = express.Router();

apiRouter.post('/convert-video', (req, res) => {
    return res.json({
        success: true,
        url: 'https://media.giphy.com/media/l0HlPjezGYJiHRfyU/giphy.gif'
    });
})

export default apiRouter;
