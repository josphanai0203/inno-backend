const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY_GEMINI);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

module.exports = model;
