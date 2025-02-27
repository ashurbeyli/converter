import { exec } from "child_process";
import path from "path";
import fs from "fs";

export async function convertMp4ToGif(inputPath: any) {
    return new Promise((resolve, reject) => {
        const outputFilename = path.basename(inputPath, path.extname(inputPath)) + ".gif";
        const outputPath = path.join("uploads", outputFilename);
        
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
