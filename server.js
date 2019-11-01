var bodyParser = require("body-parser");
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs= require("express-handlebars");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;


// Initialize Express
var app = express();


var routes = require("./config/routes.js")
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main"}))
app.set("view engine", "handlebars"); 
app.use(routes)
// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/hiphop");
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});



