import { exec } from "child_process";
import path from "path";
import fs from "fs";

// TODO: use uploadDir from env variables later
const uploadsDir = process.env['NODE_ENV'] === 'production' ? 
    '/app/uploads' :
    path.join(__dirname, '../../../../uploads');

export async function convertMp4ToGif(filename: any) {
    return new Promise((resolve, reject) => {
        // TODO: extract these into util function to prepare command
        const inputPath = path.join(uploadsDir, filename);
        const outputFilename = path.basename(path.join(uploadsDir, inputPath), path.extname(inputPath)) + ".gif";
        const outputPath = path.join(uploadsDir, outputFilename);

        console.log(inputPath, outputFilename, outputPath);
        
        // TODO: validate with ffmpeg if file dimensions are not exceeded than 1024x768 and length < 10seconds
        // TODO: extract these into util function to prepare command
        const command = `ffmpeg -i ${inputPath} -vf "fps=5,scale=400:-1:flags=lanczos" -y ${outputPath}`;
        const process = exec(command);
        
        if (process.stderr) {
            process.stderr.on("data", (err) => {
                console.log(err)
            })
        }

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