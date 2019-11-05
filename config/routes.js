// var express = require("express");
// var app = express();
//var scrape = require("../scripts/scrape");

var db = require("../models");




var axios = require("axios");
var cheerio = require("cheerio") 
module.exports= function(app) {
// app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) =>{
  console.log("you hit it")
    res.render("home");
});
// SCRAPE
app.get("/scrape", function(req, res) {
  
  // grab the body of the html with axios
  axios.get("https://thesource.com/category/news/").then(function(response) {
    
    var $ = cheerio.load(response.data);

    // Now, we grab every h3 within an article tag
    $("article h2").each(function(i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link
      result.title =  $(this)
        .children("a")
        .text();
      result.url = $(this)
        .children("a")
         .attr("href");
            console.log("title of the ****** "+result.title)
      
      db.Article.create(result)
        .then(function(dbArticle) {
         
          console.log(dbArticle);
                res.render("home", {db_title: dbArticle})
                

        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });

    });

    
  });
});

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {

  db.Article.find({})
    .then(function(dbArticle) {

      res.json(dbArticle);
    })
    .catch(function(err) {
     
      res.json(err);
    });
});


app.get("/articles/:id", function(req, res) {
  
  db.Article.findOne({ _id: req.params.id })
    
    .populate("note")
    .then(function(dbArticle) {
      // send article back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // send error to the client
      res.json(err);
    });
});

// saving/updating an Article's associated Note
 app.post("/articles/:id", function(req, res) {
   // Create a new note and pass the req.body to the entry
   db.Note.create(req.body)
     .then(function(dbNote) {
      
      
       return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
     })
     .then(function(dbArticle) {
    
       res.json(dbArticle);
     })
     .catch(function(err) {
     
       res.json(err);
     });
});
}

