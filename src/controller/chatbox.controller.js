"use strict";

const { generateContent } = require("../service/gemini.service");

class ChatboxController {
  async generateContent(req, res, next) {
    const { prompt } = req.body;
    const stream = generateContent({ prompt });
    stream.pipe(res);
  }
  
}

module.exports = new ChatboxController();
