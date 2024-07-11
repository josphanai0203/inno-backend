const model = require("../config/gemini.config");

const generateContent = async ({ prompt }) => {
  const stream = await model.generateContentStream({
    prompt,
  });
  return stream;
};

module.exports = {
  generateContent,
};
