"use strict";

const { generateContent } = require("../service/gemini.service");

class ChatboxController {
  async generateContent(req, res, next) {
    const { prompt } = req.body;
    const result = await generateContent({ prompt });
    res.status(200).json(result);
  }
}

module.exports = new ChatboxController();
