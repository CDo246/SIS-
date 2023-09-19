import dotenv from "dotenv";
dotenv.config({ path: ".env" });
dotenv.config({ path: "../../.env" });

if (!process.env.OPENAI_KEY) {
    throw(new Error ('Please provide a valid Open AI key'))
  }

export const openaiKey = process.env.OPENAI_KEY;