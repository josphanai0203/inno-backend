"use strict";
const mongoose = require("mongoose");

class Database {
  constructor() {
    this.connectString = process.env.MONGODB_URI;
    this.connect();
  }
  connect(type = "mongodb") {
    mongoose.set("debug", { shell: true, color: true });
    console.log(this.connectString);
    mongoose
      .connect(this.connectString)
      .then((_) => {
        console.log(this.connectString);
        console.log(`Database connected`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}
const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
