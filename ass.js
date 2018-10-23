axios.all([
    axios.get('https://www.arabnews.com/economy'),
    axios.get('https://www.aljazeera.com')
  ])
  .then(axios.spread((arabRes, aljayRes) => {
    // do something with both responses
    var $ = cheerio.load(response.data);
    var titlesArray = [];

    // Now, we grab every h2 within an article tag, and do the following:
    $(".latest-news-topic").each(function (i, element) {
      // Save an empty result object
      var result = {};



      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children()
        .text();
      result.link = "https://www.aljazeera.com" + $(this)
        .children()
  });
  var $ = cheerio.load(response.data);
  //var titlesArray = [];

  // Now, we grab every h2 within an article tag, and do the following:
  $(".article-item-title").each(function (i, element) {//index_value result.value
    // Save an empty result object
    var result = {};

    // Add the text and href of every link, and save them as properties of the result object
    result.title = $(this).children().text();
    result.link = "https://www.arabnews.com" + $(this).find("a[href]").attr('href');

    /*
    result.tasi = $(".value").text();
    result.nomu = $(".smevalue").text();
    */
    //result.date = Date.prototype.getDate();

    console.log(result, "this is the result");
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
  res.send("Scrape Complete");

})
});



  // app.get("/scrape", function (req, res) {
  //   // First, we grab the body of the html with request
  //   axios.get("https://www.aljazeera.com/").then(function (response) {
  //     // Then, we load that into cheerio and save it to $ for a shorthand selector
  //     var $ = cheerio.load(response.data);
  //     var titlesArray = [];
  
  //     // Now, we grab every h2 within an article tag, and do the following:
  //     $(".latest-news-topic").each(function (i, element) {
  //       // Save an empty result object
  //       var result = {};
  
  
  
  //       // Add the text and href of every link, and save them as properties of the result object
  //       result.title = $(this)
  //         .children()
  //         .text();
  //       result.link = "https://www.aljazeera.com" + $(this)
  //         .children()
  //         .attr("href");
  //       result.summary = $(".article-heading-des").text();
  
  
  
  //       // axios.get("https://www.aljazeera.com/").then(function (response) {
  //       //       //then, we load that into cheerio and save it to $ for a shorthand selector
  //       //   var $ = cheerio.load(response.data);
  
  //       //       //var titlesArray = [];
  //       //     result.summary = $(".article-heading-des").text();
  
  //       console.log(result, "this is the result");
  //       // Create a new Article using the `result` object built from scraping
  //       db.Article.create(result)
  //         .then(function (dbArticle) {
  //           // View the added result in the console
  
  
  //           //articlesArray.push(dbArticle);
  
  //         })
  //         .catch(function (err) {
  //           // If an error occurred, send it to the client
  //           return res.json(err);
  //         });
  //     });
  
  //     // If we were able to successfully scrape and save an Article, send a message to the client
  //     res.send("Scrape Complete");
  //   });
  // });