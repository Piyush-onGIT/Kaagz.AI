import mime from "mime";
import { fileURLToPath } from "url";
// import fs from "fs";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const apiKey =
  process.env.GEMINI_API_KEY || "AIzaSyA_Oy4JVKOttF8tE3EueQGSMZMEoXnJmHU";
const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);
const MAX_FILE_SIZE_MB = 5;

async function uploadToGemini(buffer, originalName) {
  const fileSizeMB = buffer.length / (1024 * 1024);

  if (fileSizeMB > MAX_FILE_SIZE_MB) {
    throw new Error(
      `File size exceeds the 5 MB limit: ${fileSizeMB.toFixed(2)} MB`
    );
  }

  const mimeType = mime.getType(originalName) || "application/octet-stream";
  const tempFilePath = `/tmp/${uuidv4()}_${originalName}`; // Create a unique temporary file path

  try {
    // Save the buffer to the temporary file
    await fs.writeFile(tempFilePath, buffer);

    // Upload the temporary file to Gemini
    const uploadResult = await fileManager.uploadFile(tempFilePath, {
      mimeType,
      displayName: originalName,
    });

    // Clean up the temporary file
    await fs.unlink(tempFilePath);

    return uploadResult.file;
  } catch (error) {
    // Clean up the file in case of an error
    await fs.unlink(tempFilePath).catch(() => {});
    throw error;
  }
}

export { uploadToGemini };
