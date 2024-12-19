import express from "express";
import multer from "multer";
import { create } from "ipfs-http-client";
import cors from "cors";
import dotenv from "dotenv";
import { uploadToGemini } from "./utils/gemma.js";
import fs from "fs";
import path from "path";
import levenshtein from "js-levenshtein";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

dotenv.config();

const { IPFS_HOST, IPFS_PORT, IPFS_PROTOCOL, GATEWAY_URL, PORT } = process.env;

const apiKey =
  process.env.GEMINI_API_KEY || "AIzaSyA_Oy4JVKOttF8tE3EueQGSMZMEoXnJmHU";

// const apiKey =
//   process.env.GEMINI_API_KEY || "AIzaSyBmlSSNdYj4pxIkNa6CuF1GOerwAYbLYu4";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

const ipfs = create({
  host: IPFS_HOST,
  port: IPFS_PORT,
  protocol: IPFS_PROTOCOL,
});

const genAI = new GoogleGenerativeAI(apiKey);
const THRESHOLD = 80; // Threshold percentage for verification

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 0.2,
  topP: 0.8,
  topK: 40,
  maxOutputTokens: 2048,
  responseMimeType: "application/json",
};

// Endpoint to upload a file to IPFS
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const buffer = req.file.buffer;

    const result = await ipfs.add(buffer);

    res.status(200).json({
      message: "File successfully uploaded to IPFS",
      ipfsPath: result.path,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error uploading file to IPFS" });
  }
});

app.post("/extract", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Please upload a file." });
  }

  try {
    // Load the JSON data
    const dummyDataPath = path.join(
      "/home/piyush/codelab/sih-backend/node-server/constants/aadhaar_data_extended.json"
    );
    const dummyData = JSON.parse(fs.readFileSync(dummyDataPath, "utf8"));

    // Upload the file to Gemini
    const uploadedFile = await uploadToGemini(
      req.file.buffer,
      req.file.originalname
    );

    // Start chat session to extract the document's information
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              text: `I will share a document. Identify the type of document and extract the relevant information.`,
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              fileData: {
                mimeType: uploadedFile.mimeType,
                fileUri: uploadedFile.uri,
              },
            },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage("");

    try {
      const extractedData = JSON.parse(result.response.text());
      const extractedString = JSON.stringify(extractedData);

      // Match the extracted data with the dummy JSON data
      let bestMatch = null;
      let highestMatchPercentage = 0;

      dummyData.forEach((entry) => {
        const entryString = JSON.stringify(entry);
        const distance = levenshtein(extractedString, entryString);

        // Calculate match percentage
        const maxLen = Math.max(extractedString.length, entryString.length);
        const matchPercentage = ((maxLen - distance) / maxLen) * 100;

        if (matchPercentage > highestMatchPercentage) {
          highestMatchPercentage = matchPercentage;
          bestMatch = entry;
        }
      });

      // Check if the highest match percentage crosses the threshold
      const isVerified = highestMatchPercentage >= THRESHOLD;

      // Prepare the response
      const response = {
        ...extractedData,
        isVerified,
        matchedPercentage: highestMatchPercentage.toFixed(2),
        matchedEntry: isVerified ? bestMatch : null,
      };

      return res.json(response);
    } catch (error) {
      return res.status(500).json({ error: "Failed to parse AI response." });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
