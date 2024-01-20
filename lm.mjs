import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genConfig = {
  maxOutputTokens: 450, // TODO: make this dynamic
  temperature: 0.4, // TODO: make this dynamic
  topP: 0.12, // TODO: make this dynamic
  topK: 16, // TODO: make this dynamic
  // TODO: add stop sequence
};

const safetySettings = [
  {
    category: "HARM_CATEGORY_HARASSMENT",
    threshold: "BLOCK_NONE",
  },
  {
    category: "HARM_CATEGORY_HATE_SPEECH",
    threshold: "BLOCK_NONE",
  },
  {
    category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    threshold: "BLOCK_NONE",
  },
  {
    category: "HARM_CATEGORY_DANGEROUS_CONTENT",
    threshold: "BLOCK_NONE",
  },
];

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-pro",
  safetySettings,
  genConfig,
});

export default async function generate(prompt, options) {
  const systemMessage = options.systemMessage ?? "";
  const finalPrompt = systemMessage + prompt;
  return await model
    .generateContent([finalPrompt], {
      maxOutputTokens: options.maxOutputTokens,
    })
    .then((r) => r.response.text());
}
