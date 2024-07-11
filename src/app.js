const compression = require("compression");
const express = require("express");
const cors = require("cors");
// const Database = require("./dbs/init.mongo");

const app = express();
require('./config/passport')

// //Connect Database
// Database();

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}))
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./dbs/init.mongo");
// Routes
app.use("/v1/api", require("./router"));


// Server
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
  });


module.exports = app;