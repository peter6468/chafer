## CHAFER ##
Chafer is scraper website.  
* It scrapes data from ALJAZEERA.  It picks up the top ten stories when you hit the "Begin Scrape" button
* Whenever a user hovers over the title and the link, a box will populate to the right of the screen which allows the user to leave his/her name and a comment.  This comment gets saved in mongoose.
** On the back end it uses
* node.express: a declaritive routing system. 
* node.body-parser: bodyParser object uses various factories to create middlewares that reads a form's input + stores it as javascript object accessible through req.body
* node.path: module provides utlitlies for working w/file + directory paths
* node express-handlebars: uses sane defaults that leverage the "Express-way" of structuring an app's views. This makes it trivial to use in basic apps.
* axios: is a Promise-based HTTP client for JavaScript which can be used in your front-end application and in your Node.js backend.  By using Axios it’s easy to send asynchronous HTTP request to REST endpoints and perform CRUD operations. The Axios library can be used in your plain JavaScript application or can be used together with more advanced frameworks like Vue.js.
* cheerios: parses markup and provides an API for traversing/manipulating the resulting data structure.
* mongoose: is a MongoDB object modeling tool designed to work in an asynchronous environment.
* morgan: is a HTTP request logger middleware for node.js
* logger: is a simple logging library that combines the simple APIs of Ruby's logger.rb and browser-js console.log()

How to use:
1. visit: https://fathomless-refuge-20990.herokuapp.com/

Here are sme screenshots:
1. Pre scrape
![screen shot 2018-09-20 at 1 35 35 pm](https://user-images.githubusercontent.com/36605965/45836177-15d56880-bcda-11e8-98e8-ee8390009274.png)

2. Post Scrape
![screen shot 2018-09-20 at 1 40 56 pm](https://user-images.githubusercontent.com/36605965/45836508-073b8100-bcdb-11e8-93c5-cb0a34aeb85d.png)

3. Comment Box
![screen shot 2018-09-20 at 1 43 33 pm](https://user-images.githubusercontent.com/36605965/45836575-3baf3d00-bcdb-11e8-83df-db32a9f75a2e.png)

This Project in maintained by peter6468 and users can contact him to get help.