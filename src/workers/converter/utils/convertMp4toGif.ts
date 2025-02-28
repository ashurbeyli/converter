import { exec } from "child_process";
import path from "path";
import fs from "fs";

// const uploadsDir = path.join(__dirname, '../../../../uploads'); // TODO: use uploadDir from env variables
const uploadsDir = "/app/uploads";

export async function convertMp4ToGif(filename: any) {
    return new Promise((resolve, reject) => {
        // TODO: extract these into util function to prepare command
        const inputPath = path.join(uploadsDir, filename);
        const outputFilename = path.basename(path.join(uploadsDir, inputPath), path.extname(inputPath)) + ".gif";
        const outputPath = path.join(uploadsDir, outputFilename);
        
        const command = `ffmpeg -i ${inputPath} -vf "fps=10,scale=320:-1:flags=lanczos" -y ${outputPath}`;
        const process = exec(command);
        
        process.on("close", (code) => {
            if (code === 0) {
                fs.unlinkSync(inputPath); // Cleanup input file
                resolve(outputFilename);
            } else {
                reject(new Error("Conversion failed"));
            }
        });
    });
}