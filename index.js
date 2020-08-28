const express = require("express");
const port = 8000;
const app = express();

//Middleware to Use Express Router

app.use("/", require("./routes"));

//Set up the views and view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running server ${err}`);
  }
  console.log(`Server is running on port ${port}`);
});
