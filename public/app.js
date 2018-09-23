//Grab the articles as a json
$.getJSON("/articles", function (data) {
  // For each one
  for (var i = 0; i < data.length; i++) {

    // $("#articles").append($("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br>" + "<a href =" + data[i].link + ">" + data[i].link + "</a>" + "</p>"));
    $("#articles").prepend($(`<p data-id="${data[i]._id}">${data[i].title}<br><a target="_blank" href="${data[i].link}">${data[i].link}</a></p>`));
    // $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br>" + data[i].link + "</p>");
  }
});

$(document).ready(function () {
  $('#beginScrape').on('click', function () {
    console.log('dirty');
    $("#beginScrape").remove();
    console.log('clean');
    $.get('/scrape', function (response) {
      window.location = '/';
    });
  });


  // Whenever someone clicks a p tag
  $(document).on("click", "p", function () {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
      })
      // With that done, add the note information to the page
      .then(function (data) {
        console.log(data);
        console.log('eat');

        // The title of the article
        $("#notes").append("<h2>" + data.title + "</h2>");
        // An input to enter a new title
        console.log('me');
        $("#notes").append("<input id='titleinput' name='title' >");
        // A textarea to add a new note body
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
        $("#notes").append("<button data-id='" + data._id + "' id='deletenote'>Delete Note</button>");

        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
  });

  // When you click the savenote button
  $(document).on("click", "#savenote", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
          // Value taken from title input
          title: $("#titleinput").val(),
          // Value taken from note textarea
          body: $("#bodyinput").val()
        }
      })
      // With that done
      .then(function (data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
});

$(document).on("click", "#deletenote", function () {
  var thisId = $(this).attr("data-id");
  var articleId = $(this).attr("data-article");
  
  $.ajax({
      method: "POST",
      url: `/delete/${thisId}/${articleId}`,
    })
    .then(function (data) {
      console.log(data);
      if (data.note) {
        $("#titleinput").val(data.note.title);
        $("#bodyinput").val(data.note.body);
      }
      $("#notes").empty();
    });
});


var clockID;
var yourTimeZoneFrom = +3; //time zone value where you are at
var d = new Date();
//get the timezone offset from local time in minutes
var tzDifference = yourTimeZoneFrom * 60 + d.getTimezoneOffset();
//convert the offset to milliseconds, add to targetTime, and make a new Date
var offset = tzDifference * 60 * 1000;

function UpdateClock() {
  var tDate = new Date(new Date().getTime() + offset);
  var in_hours = tDate.getHours()
  var in_minutes = tDate.getMinutes();
  var in_seconds = tDate.getSeconds();
  if (in_minutes < 10)
    in_minutes = '0' + in_minutes;
  if (in_seconds < 10)
    in_seconds = '0' + in_seconds;
  if (in_hours < 10)
    in_hours = '0' + in_hours;
  document.getElementById('theTime').innerHTML = "" +
    in_hours + ":" +
    in_minutes + ":" +
    in_seconds;
}

function StartClock() {
  clockID = setInterval(UpdateClock, 500);
}

function KillClock() {
  clearTimeout(clockID);
}
window.onload = function () {
  StartClock();
}