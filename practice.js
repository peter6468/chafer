console.log("usucl");
let request = require('request-promise')

let key = 'e09b17d2-f7e3-4796-8328-220cf8ec2ec2'
let url = `http://api.denoti.com/api/finance/commodity/Brent Crude Oil/last?apikey=${key}`

let res  = await request(url)
let data = JSON.parse(res)

console.log(data)