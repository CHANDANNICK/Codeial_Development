const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");

console.log("Router Loaded");

//Route for home
router.get("/", homeController.home);

//All other Routers
router.use("/users", require("./users"));

module.exports = router;
