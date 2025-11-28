import { GoogleGenAI } from "@google/genai";
import { AnimalConfig } from "../types";

// Initialize Gemini Client
// Note: process.env.API_KEY is assumed to be available in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAnimalThought = async (animal: AnimalConfig, action: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `${animal.prompt} Keep your response under 15 words. Avoid hashtags.`;
    const userPrompt = `The user just ${action}. What do you think?`;

    const response = await ai.models.generateContent({
      model,
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.9,
        maxOutputTokens: 30, // Keep it short
      }
    });

    return response.text || getDefaultThought(animal);
  } catch (error) {
    console.error("Error generating thought:", error);
    return getDefaultThought(animal);
  }
};

const getDefaultThought = (animal: AnimalConfig): string => {
  const defaults = [
    "Meow?",
    "Woof!",
    "Hmm...",
    "Where are we going?",
    "I'm hungry.",
    "*Sniff sniff*",
    "Wait for me!",
    "So fast!"
  ];
  return defaults[Math.floor(Math.random() * defaults.length)];
};