import { GoogleGenAI } from "@google/genai";
// import dotenv from "dotenv";

// dotenv.config();


export async function getImportantFiles(metadata) {

    const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});


    const prompt = `
    You are a senior software engineer.

    README:
    ${metadata.readme}

    Dependencies:
    ${metadata.dependencies.join(", ")}

    Dev Dependencies:
    ${metadata.devDependencies.join(", ")}

    Repository Tree:
    ${metadata.fileTree}

    Identify the 10 most important files
    for understanding this repository.

    Ignore:
    - tests
    - examples
    - docs

    Return ONLY valid JSON.

    Select the 10 most important SOURCE FILES
    for understanding the architecture,
    business logic, and implementation.

    Avoid:
    - LICENSE
    - .gitignore
    - lint configs
    - formatting configs
    - CI/CD files
    - documentation files

    Return only files that contain
    meaningful implementation logic.

    {
    "importantFiles": []
    }
    `;

    console.log("SERVICE KEY:", process.env.GEMINI_API_KEY?.slice(0, 10));

    console.log("Prompt length:", prompt.length);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt
  });

  const cleaned = response.text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

    const parsed = JSON.parse(cleaned);


  return parsed;
}