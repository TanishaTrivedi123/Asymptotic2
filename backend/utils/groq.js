const { Groq } = require("groq-sdk"); //Groq ek class he jo Groq ke servers se baat karti he LLM requests send/receive karti he

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

module.exports = { groq };
