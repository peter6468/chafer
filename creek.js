// const cheerio = require("cheerio");
// const axios = require('axios');
// const request = require('request')

// const pages = [
//   'pageno=01&marketId=0',
//   'pageno=02&marketId=0',
//   'pageno=03&marketId=0',
//   'pageno=04&marketId=0',
//   'pageno=05&marketId=0',
//   'pageno=06&marketId=0',
//   'pageno=07&marketId=0',
//   'pageno=08&marketId=0',
//   'pageno=09&marketId=0',
//   'pageno=10&marketId=0',
//   'pageno=11&marketId=0'
// ];
// //const apiURL = 'https://www.argaam.com/en/company/companypreviousyeardividendfilterresult?companyID=0&year=2017&sectorID=0&argaamsectorIDs=&distBonusSelection=0&orderBy=CashDividend%20desc&pageno=01&marketId=0';
// const apiURL = 'https://www.argaam.com/en/company/companypreviousyeardividendfilterresult?companyID=0&year=2017&sectorID=0&argaamsectorIDs=&distBonusSelection=0&orderBy=CashDividend%20desc&';


// const logPosts = async () => {
//   try {
//     let allpages = pages.map(num => axios(`${apiURL}${num}`));
//     let info = await Promise.all(allpages);
//     info.forEach(page => {
//       console.log(page.data);
//     });
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };
// logPosts();

const cheerio = require("cheerio");
const axios = require("axios");

console.log("\n***********************************\n" +
            "Grabbing every thread name and link\n" +
            "from aljazeera's webdev board:" +
            "\n***********************************\n");

axios.get("https://www.argaam.com/en/company/companypreviousyeardividendfilterresult?companyID=0&year=2017&sectorID=0&argaamsectorIDs=&distBonusSelection=0&orderBy=CashDividend%20desc&pageno=01&marketId=0").then(function(response){
  
  const html = response.data;
  const $ = cheerio.load(html);

  const results = [];

  $(".aplusholdBM tr").each(function(i, element) {
    const td = $(element).find("td");

    const name =td.eq(0).text();

    const price= td.eq(3).text();
    const divYield= td.eq(4).text();
    const distDate= td.eq(6).text();
    const decDate= td.eq(7).text();
  
    results.push({
      name, 
      price,
      divYield,
      distDate,
      decDate
    
    });
  });

  console.log(results);

});