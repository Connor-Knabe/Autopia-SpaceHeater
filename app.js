var rp = require('request-promise');
var express = require('express');
var cronTimeService = require('./cronTimeService');
var os = require('os');
var bodyParser = require('body-parser');

var routes = require('./routes.js');
var sInfo = require('./sInfo.js');
var app = express();
var port = process.env.PORT || 80;
var calendarCheckInterval = 30;
process.env.TZ = 'America/Chicago';

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);
app.listen(port);
console.log('Magic happens on port ' + port +" - "+ new Date());

setInterval(function(){
    console.log(new Date(),' checking for new data');
    rp({
        uri: sInfo.calendarUrl,
        json: true // Automatically parses the JSON string in the response
    }).then(function (data) {
        cronTimeService.addCal(data);
    }).catch(function (err) {
        if(err){
            if(err.error === 'Not Found !!!'){
                cronTimeService.addCal(null);
            } else {
                console.error('error checking for data', err.message);
            }

        }
    });

},calendarCheckInterval*60*1000);
