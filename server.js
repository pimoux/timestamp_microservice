// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


//https://Timestamp-Microservice--freecodecamp.repl.co/api/timestamp/2015-12-25
// your first API endpoint... 
app.get("/api/timestamp/:strDate", function (req, res) {
  
  //dates
  
  const { strDate } = req.params;
  const date = new Date(strDate);
  
  //a regex to test if the string, the method getTime() always return a 13 digits number today
  //(Can be wrong in decades or centuries)
  
  let reg = /\d{13}/;
  let parseDate = parseInt(strDate)
  if(reg.test(parseDate)){
    let convertDate = new Date(parseDate);
    return res.json({
      "unix": strDate,
      "utc": convertDate.toUTCString()
    })
  }

  //If the date is invalid we return an object which contains the error
  
  if(date == "Invalid Date"){
    return res.json({
      "error": "Invalid Date"
    })
  }
  
  //We can return the informations
  
  return res.json({
    "unix": date.getTime(),
    "utc": date.toUTCString()
  })
  
});

//If there is any parameters informed by the user, we return the date now

app.get("/api/timestamp/", function (req, res) {
  let date = new Date()
  return res.json({
    "unix": date.getTime(),
    "utc": date.toUTCString()
  })
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});