import path from "path";

// Constants
import { UPLOADS_DIR } from "../config/constants";

export const getInputPathFromFileName = (filename: string) => {
    return path.join(UPLOADS_DIR, filename);
}

export const getOutputFileNameFromInputPath = (inputPath: string) => {
    return path.basename(inputPath, path.extname(inputPath)) + ".gif";
}

export const getOutputPathFromInputPath = (inputPath: string) => {
    const outputFilename = getOutputFileNameFromInputPath(inputPath);
    
    return path.join(UPLOADS_DIR, outputFilename);
}

export const prepareFFmpegConversionCommand = (inputPath: string, outputPath: string) => {
    // TODO: validate with ffmpeg if file dimensions are not exceeded than 1024x768 and length < 10seconds
    return `ffmpeg -i ${inputPath} -vf "fps=5,scale=400:-1:flags=lanczos" -y ${outputPath}`;
}