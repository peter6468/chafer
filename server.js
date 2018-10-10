//require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");
var moment = require('moment-timezone');
// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = process.env.PORT || 3033;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({
  extended: true
}));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));
// Use express.static to serve the public folder as a static directory
app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Connect to the Mongo DB
var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;

mongoose
  .connect(
    MONGODB_URI, {
      useNewUrlParser: true
    }

  )
  .then(connection => {
    console.log("Connected to MongoDB");
  })
  .catch(error => {
    console.log(error.message);
  });

// Routes
app.get("/", function (req, res) {
  db.Article.find({})
    .then(function (articles) {

      res.render("index", {
        articles: articles
      });
    })
    .catch(function (err) {
      res.json(err);
    })
})


// A GET route for scraping the echoJS website
app.get("/scrape", function (req, res) {
  // First, we grab the body of the html with request
  axios.get("https://www.arabnews.com/economy").then(function (response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    let $ = cheerio.load(response.data);
    //var titlesArray = [];

    // Now, we grab every h2 within an article tag, and do the following:
    $(".article-item-title").each(function (i, element) { //index_value result.value
      // Save an empty result object
      let result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this).children().text();
      result.link = "https://www.arabnews.com" + $(this).find("a[href]").attr('href');

      /*

      result.tasi = $(".value").text();
      result.nomu = $(".smevalue").text();


      */
      //result.date = Date.prototype.getDate();

      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function (dbArticle) {
          // View the added result in the console


          //articlesArray.push(dbArticle);

        })
        .catch(function (err) {
          // If an error occurred, send it to the client
          return res.json(err);
        });
    });

    // If we were able to successfully scrape and save an Article, send a message to the client
    return axios.get("https://www.aljazeera.com/");
  }).then(res => {
    let $ = cheerio.load(res.data);
    let titlesArray = [];

    // Now, we grab every h2 within an article tag, and do the following:
    $(".latest-news-topic").each(function (i, element) {
      // Save an empty result object
      let result = {};



      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children()
        .text();
      result.link = "https://www.aljazeera.com" + $(this)
        .children()
        .attr("href");
      result.summary = $(".article-heading-des").text();



      // axios.get("https://www.aljazeera.com/").then(function (response) {
      //       //then, we load that into cheerio and save it to $ for a shorthand selector
      //   var $ = cheerio.load(response.data);

      //       //var titlesArray = [];
      //     result.summary = $(".article-heading-des").text();

      console.log(result, "this is the result for alja");
      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function (dbArticle) {
          // View the added result in the console


          //articlesArray.push(dbArticle);

        })
        .catch(function (err) {
          // If an error occurred, send it to the client
          console.log(err, "------------------------")
        });
    });

  });
  res.send("scrape complete");
});

function getAljazeera(res) {

  // First, we grab the body of the html with request
  axios.get("https://www.aljazeera.com/").then(function (response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector


    // If we were able to successfully scrape and save an Article, send a message to the client
    res.send("Scrape Complete");
  });

}

// Route for getting all Articles from the db
app.get("/articles", function (req, res) {
  // Grab every document in the Articles collection
  //allows
  db.Article.find({}).sort({
      _id: -1
    })
    .then(function (dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });


});

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function (req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Article.findOne({
      _id: req.params.id
    })
    // ..and populate all of the notes associated with it
    .populate("note")
    .then(function (dbArticle) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      res.json(dbArticle);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function (req, res) {
  // Create a new note and pass the req.body to the entry
  db.Note.create(req.body)
    .then(function (dbNote) {
      // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Article.findOneAndUpdate({
        _id: req.params.id
      }, {
        note: dbNote._id
      }, {
        new: true
      });
    })
    .then(function (dbArticle) {
      // If we were able to successfully update an Article, send it back to the client
      res.json(dbArticle);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// app.delete('/user', function (req, res) {
//   res.send('Got a DELETE request at /user')
// })

// Route for delete a Note
app.post("/delete/:id/:articleId", function (req, res) {
  db.Note.deleteOne({
      _id: mongoose.Types.ObjectId(req.params.id)
    })
    .then(function (dbNote) {
      return db.Article.findOneAndUpdate({
        _id: mongoose.Types.ObjectId(req.params.articleId)
      }, {
        note: ''
      }, {
        new: true
      });
    })
    .then(function (dbNote) {
      res.json(dbNote);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
//});