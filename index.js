// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  //empty date params 
  if (!req.params.date) {
    const unix = Date.now()
    const utc = new Date(unix).toUTCString()
    res.send({ utc, unix})
  }
  //utc date params
  else if (!isNaN(req.params.date)) {
    const unix = parseInt(req.params.date)
    const utc = new Date(unix).toUTCString()
    res.send({ utc, unix})
  }
  //unix date params
  else {
    const utc = new Date(req.params.date).toUTCString()
    //invalid date
    if (utc.toLowerCase() == "invalid date") {
      res.send({ error: "Invalid Date"})
    } else {
      const unix = Date.parse(utc)
      res.send({ utc, unix})
    }
  }

  
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});




// // index.js
// // where your node app starts

// // init project
// var express = require('express');
// var app = express();

// // enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// // so that your API is remotely testable by FCC 
// var cors = require('cors');
// app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// // http://expressjs.com/en/starter/static-files.html
// app.use(express.static('public'));

// // http://expressjs.com/en/starter/basic-routing.html
// app.get("/", function (req, res) {
//   res.sendFile(__dirname + '/views/index.html');
// });

// const isInValidDate = (date) => date.toUTCString() === "Invalid Date";

// // your first API endpoint... 
// app.get("/api/:date", function (req, res) {
//   let date = new Date(req.params.date)

//   if(isInValidDate(date)){
//     date = new Date(+req.params.date)
//   }

// if(isInValidDate(date)){
//   res.json({
//     error: "Invalid Date"
//   })
//   return;
// }

//   if(isInValidDate)
//   res.json({
//     unix: date.getTime(),
//     utc: date.toUTCString()});
// });

// app.get("/api", (req, res)=>{
//   res.json({
//     unix: new Date().getTime(),
//     utc: new Date().toUTCString()
//   })
// })

// // Listen on port set in environment variable or default to 3000
// var listener = app.listen(process.env.PORT || 3000, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });
