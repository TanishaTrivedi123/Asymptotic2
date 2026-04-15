const { groq } = require("../utils/groq");

const MODELS = [
  // "llama-3.1-8b-instant", // OKAY: fast but shallow, basic questions only
  "llama-3.3-70b-versatile",
  // "gemma-7b-it",
];

const generateAIResponse = async (messages) => {
  let lastError;

  console.log("AI request started");

  for (const model of MODELS) {
    try {
      console.log(`Trying model: ${model}`);

      const response = await groq.chat.completions.create({
        model,
        messages,
      });

      console.log(`✅ Model success: ${model}`);

      return response.choices[0].message.content;
    } catch (error) {
      console.error(`Model failed: ${model}`);
      lastError = error;
    }
  }
  console.error("All models failed");
  throw lastError;
};

module.exports = { generateAIResponse };
