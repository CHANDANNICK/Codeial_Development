// Require library
const mongoose = require("mongoose");

//Emvironment Variables
require("dotenv").config();

const uri = process.env.ATLAS_URI;

mongoose.connect(uri || "mongodb://localhost/codeial_development", {
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
