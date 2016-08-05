var rp = require('request-promise');
var express = require('express');
var cronTimeService = require('./cronTimeService');
var heaterService = require('./heaterService');

var routes = require('./routes.js');
var sInfo = require('./sInfo.js');
var app = express();
var port = process.env.PORT || 3000;
var calendarCheckInterval = 30;

app.use('/', routes);
app.listen(port);
console.log('Magic happens on port ' + port +" - "+ new Date());

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/turnOn/:time', function(req, response){
	var timeInMins = req.params.time;

    heaterService.turnOnTimed(timeInMins);
});

app.get('/turnOn', function (req, res) {
    heaterService.turnOnTimed();

    res.send('Turned on');
});


setInterval(function(){
    console.log(new Date(),' checking for new data');
    //this occurs every 30 minutes
    rp({
        uri: sInfo.url,
        json: true // Automatically parses the JSON string in the response
    }).then(function (data) {
        // console.log('data',data);
        cronTimeService.addCal(data);
    }).catch(function (err) {
        cronTimeService.addCal(null);
        if(err && (err.error !== 'Not Found !!!')){
            console.error('error checking for data', err.message);
        }
    });

},calendarCheckInterval*60*1000);
