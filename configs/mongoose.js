// Require library
const mongoose = require("mongoose");

// Connecting to DataBase
const MONGODBURL =
  "mongodb+srv://admin:He11@@nk@cluster0.rkmcu.mongodb.net/codeial_development?retryWrites=true&w=majority";

mongoose.connect(MONGODBURL || "mongodb://localhost/codeial_development", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

//Aquiring DataBase To Check If it is available or not
const db = mongoose.connection;

//Error
db.on("error", console.error.bind(console, "Error in Connecting to DataBase"));

//Up And Running
db.once("open", function () {
  console.log("Successfully connect to MongoDB");
});

module.exports = db;
