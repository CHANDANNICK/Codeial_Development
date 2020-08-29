const express = require("express");
const port = 8000;
const app = express();
const expressLayouts = require("express-ejs-layouts");

app.use(expressLayouts);

//Middleware to Use Express Router
app.use("/", require("./routes"));

//Extracting Styles and Scripts of individual pages and place in the layout page
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//Set up the views and view engine
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded());
app.use(express.static("assets"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running server ${err}`);
  }
  console.log(`Server is running on port ${port}`);
});
