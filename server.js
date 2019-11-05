// var bodyParser = require("body-parser");
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs= require("express-handlebars");

// Our scraping tools

var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = process.env.PORT || 3001;

// Initialize Express
var app = express();


app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main"}))
app.set("view engine", "handlebars"); 
require("./config/routes")(app)

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/hiphop";
// mongoose.connect(URI)
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// require("./config/routes.js")(app)
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});



