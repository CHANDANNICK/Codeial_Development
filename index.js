const express = require("express");
const port = 8000;
const app = express();
const expressLayouts = require("express-ejs-layouts");
const db = require("./configs/mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocalStrategy = require("./configs/passport-local-strategy");
const MongoStore = require("connect-mongo")(session);

//Middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("assets"));
app.use(expressLayouts);

//Extracting Styles and Scripts of individual pages and place in the layout page
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//Set up the views and view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// <<-- Generating session / MongoStore is used to save the session to database -->>

app.use(
  session({
    name: "codeial",
    //TODO change the secret before deployment
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      //60,000 => 1 minute
      maxAge: 60000 * 60,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        if (condition) {
          console.log(err || "MongoStore Connected Ok !");
        }
      }
    ),
  })
);

//<<--Initialize and Use the session-->>
app.use(passport.initialize());
app.use(passport.session());

//Middleware to Use Express Router
app.use("/", require("./routes"));

//Set Authenticated user
app.use(passport.setAuthenticatedUser);

// <<-Server Status->>
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running server ${err}`);
  }
  console.log(`Server is running on port ${port}`);
});
