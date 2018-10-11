// and what you've learned in class so far, scrape a website
// of your choice, save information from the page in a result array, and log it to the console.

var cheerio = require("cheerio");
var request = require("request");

// First, tell the console what server.js is doing
console.log("\n***********************************\n" +
            "Grabbing every thread name and link\n" +
            "from aljazeera's webdev board:" +
            "\n***********************************\n");

// Make a request call to grab the HTML body from the site of your choice
//request("https://www.argaam.com/en/company/companypreviousyeardividendfilterresult?companyID=0&year=2017&sectorID=0&argaamsectorIDs=&distBonusSelection=0&orderBy=CashDividend%20desc&pageno=10&marketId=0", function(error, response, html) {

var results = [];

var urls = [
    "https://www.argaam.com/en/company/companypreviousyeardividendfilterresult?companyID=0&year=2017&sectorID=0&argaamsectorIDs=&distBonusSelection=0&orderBy=CashDividend%20desc&pageno=01&marketId=0",
    "https://www.argaam.com/en/company/companypreviousyeardividendfilterresult?companyID=0&year=2017&sectorID=0&argaamsectorIDs=&distBonusSelection=0&orderBy=CashDividend%20desc&pageno=02&marketId=0",
    "https://www.argaam.com/en/company/companypreviousyeardividendfilterresult?companyID=0&year=2017&sectorID=0&argaamsectorIDs=&distBonusSelection=0&orderBy=CashDividend%20desc&pageno=03&marketId=0",
    "https://www.argaam.com/en/company/companypreviousyeardividendfilterresult?companyID=0&year=2017&sectorID=0&argaamsectorIDs=&distBonusSelection=0&orderBy=CashDividend%20desc&pageno=04&marketId=0",
    "https://www.argaam.com/en/company/companypreviousyeardividendfilterresult?companyID=0&year=2017&sectorID=0&argaamsectorIDs=&distBonusSelection=0&orderBy=CashDividend%20desc&pageno=05&marketId=0",
    "https://www.argaam.com/en/company/companypreviousyeardividendfilterresult?companyID=0&year=2017&sectorID=0&argaamsectorIDs=&distBonusSelection=0&orderBy=CashDividend%20desc&pageno=06&marketId=0",
    "https://www.argaam.com/en/company/companypreviousyeardividendfilterresult?companyID=0&year=2017&sectorID=0&argaamsectorIDs=&distBonusSelection=0&orderBy=CashDividend%20desc&pageno=07&marketId=0",
    "https://www.argaam.com/en/company/companypreviousyeardividendfilterresult?companyID=0&year=2017&sectorID=0&argaamsectorIDs=&distBonusSelection=0&orderBy=CashDividend%20desc&pageno=08&marketId=0",
    "https://www.argaam.com/en/company/companypreviousyeardividendfilterresult?companyID=0&year=2017&sectorID=0&argaamsectorIDs=&distBonusSelection=0&orderBy=CashDividend%20desc&pageno=09&marketId=0",
    "https://www.argaam.com/en/company/companypreviousyeardividendfilterresult?companyID=0&year=2017&sectorID=0&argaamsectorIDs=&distBonusSelection=0&orderBy=CashDividend%20desc&pageno=10&marketId=0",
    "https://www.argaam.com/en/company/companypreviousyeardividendfilterresult?companyID=0&year=2017&sectorID=0&argaamsectorIDs=&distBonusSelection=0&orderBy=CashDividend%20desc&pageno=11&marketId=0",
    "https://www.argaam.com/en/company/companypreviousyeardividendfilterresult?companyID=0&year=2017&sectorID=0&argaamsectorIDs=&distBonusSelection=0&orderBy=CashDividend%20desc&pageno=12&marketId=0"
]

for (i = 0; i < urls.length; i++) { 
              request(i, function(error, response, html) {

              // Load the HTML into cheerio and save it to a variable
              // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
              var $ = cheerio.load(html);

              // An empty array to save the data that we'll scrape


              // Select each element in the HTML body from which you want information.
              // NOTE: Cheerio selectors function similarly to jQuery's selectors,
              // but be sure to visit the package's npm page to see how it works
              $(".aplusholdBM").each(function(i, element) {
                var td = $(element).find("td")
                  //if (td.length ===0) return
                //var auth = $(element).children().text(author-name);
                var name =td.eq(0).text()
                //var div = $(element).children().text();
                var price= td.eq(3).text()
                var divYield= td.eq(4).text()
                var distDate= td.eq(6).text()
                var decDate= td.eq(7).text()
                // Save these results in an object that we'll push into the results array we defined earlier
                results.push({
                  name, 
                  price,
                  divYield,
                  distDate,
                  decDate
                });
              });

              // Log the results once you've looped through each of the elements found with cheerio
            });
};
console.log(results);