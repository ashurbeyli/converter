// Libraries
import { exec } from 'child_process';
import fs from 'fs';

// Utils
import {
    getInputPathFromFileName,
    getOutputPathFromInputPath,
    getOutputFileNameFromInputPath,
    prepareFFmpegConversionCommand
} from './utils';

export async function processConversionJob(filename: string) {
    return new Promise((resolve, reject) => {
        const inputPath = getInputPathFromFileName(filename);
        const outputFilename = getOutputFileNameFromInputPath(inputPath);
        const outputPath = getOutputPathFromInputPath(inputPath);
        const command = prepareFFmpegConversionCommand(inputPath, outputPath);
        const process = exec(command);

        if (process.stderr) {
            process.stderr.on("data", (err) => {
                // if (err) console.log(err.message)
                // reject(new Error("Conversion failed"));
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