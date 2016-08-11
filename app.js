var rp = require('request-promise');
var express = require('express');
var cronTimeService = require('./cronTimeService');
var heaterService = require('./heaterService');
var dateHelper = require('./dateHelper');

var routes = require('./routes.js');
var sInfo = require('./sInfo.js');
var app = express();
var port = process.env.PORT || 3000;
var calendarCheckInterval = 0.2;
process.env.TZ = 'America/Chicago';

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


console.log('date', new Date());

console.log('date offxet fix',dateHelper.dateOffsetFix(new Date()));

setInterval(function(){
    console.log(new Date(),' checking for new data');
    rp({
        uri: sInfo.calendarUrl,
        json: true // Automatically parses the JSON string in the response
    }).then(function (data) {
        cronTimeService.addCal(data);
    }).catch(function (err) {
        cronTimeService.addCal(null);
        if(err && (err.error !== 'Not Found !!!')){
            console.error('error checking for data', err.message);
        }
    });

},calendarCheckInterval*60*1000);
