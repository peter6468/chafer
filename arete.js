const cheerio = require("cheerio");
const axios = require('axios');
const request = require('request')

const pages = [
  'pageno=01&marketId=0',
  'pageno=02&marketId=0',
  'pageno=03&marketId=0',
  'pageno=04&marketId=0',
  'pageno=05&marketId=0',
  'pageno=06&marketId=0',
  'pageno=07&marketId=0',
  'pageno=08&marketId=0',
  'pageno=09&marketId=0',
  'pageno=10&marketId=0',
  'pageno=11&marketId=0'
];
//const apiURL = 'https://www.argaam.com/en/company/companypreviousyeardividendfilterresult?companyID=0&year=2017&sectorID=0&argaamsectorIDs=&distBonusSelection=0&orderBy=CashDividend%20desc&pageno=01&marketId=0';
const apiURL = 'https://www.argaam.com/en/company/companypreviousyeardividendfilterresult?companyID=0&year=2017&sectorID=0&argaamsectorIDs=&distBonusSelection=0&orderBy=CashDividend%20desc&';


const logPosts = async () => {
  try {
    let allpages = pages.map(num => axios(`${apiURL}${num}`));
    let info = await Promise.all(allpages);
    info.forEach(page => {
      console.log(page.data);
    });
  } catch (error) {
    console.error('Error:', error);
  }
};
logPosts();