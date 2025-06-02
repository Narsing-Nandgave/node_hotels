const mongoose = require("mongoose");

const mongoURL = "mongodb://localhost:27017/hotels";

// seup mongodb connection URL
mongoose.connect(mongoURL);

// get default connection
const db = mongoose.connection;

db.on("connected", () => {
  console.log("Mongoose connected to db");
});
db.on("error", (error) => {
  console.error("Mongoose connection error:", error);
});
db.on("disconnected", () => {
  console.log("Mongoose disconnected from db");
});

// export the db connection
module.exports = db;
