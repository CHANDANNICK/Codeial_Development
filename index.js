const express = require("express");
const port = 8000;
const app = express();
const expressLayouts = require("express-ejs-layouts");
const db = require("./configs/mongoose");
const cookieParser = require("cookie-parser");

//Middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("assets"));
app.use(expressLayouts);

//Middleware to Use Express Router
app.use("/", require("./routes"));

//Extracting Styles and Scripts of individual pages and place in the layout page
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//Set up the views and view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running server ${err}`);
  }
  console.log(`Server is running on port ${port}`);
});
