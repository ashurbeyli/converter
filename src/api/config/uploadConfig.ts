import multer from "multer";
import path from "path";
import fs from "fs";

// Define upload directory
const uploadDir = process.env['NODE_ENV'] === 'production' ? '/app/uploads' : 'uploads';
// TODO: find out better place
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage settings
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// File upload settings
export const upload = multer({
    storage,
    limits: { fileSize: 500 * 1024 * 1024 }, // TODO: extract into config/constants
});
