const compression = require("compression");
const express = require("express");
const app = express();

// Middleware
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/v1/api", require("./router"));

// Server



module.exports = app;