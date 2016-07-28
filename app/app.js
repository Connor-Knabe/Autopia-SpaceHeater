var rp = require('request-promise');
var express = require('express');
var cronTimeService = require('./cronTimeService');
var routes = require('./routes.js');
var sInfo = require('./sInfo.js');
var app = express();
var port = process.env.PORT || 3000;

app.use('/', routes);
app.listen(port);
console.log('Magic happens on port ' + port +" - "+ new Date());

app.get('/', function (req, res) {
  res.send('Hello World!');
});


var options = {
    uri: sInfo.url,
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};

setInterval(function(){
    console.log(new Date(),' checking for new data');
    //this occurs every 30 minutes
    rp(options).then(function (data) {
        // console.log('data',data);
        console.log('\n\n\n');
        cronTimeService.addCal(data);
    }).catch(function (err) {
        cronTimeService.addCal(null);
        if(err && (err.error !== 'Not Found !!!')){
            console.error('error checking for data', err.message);
        }
    });

},5*1000);
