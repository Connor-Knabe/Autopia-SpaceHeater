var rp = require('request-promise');
var cronTimeService = require("./cronTimeService");
var appointments;

var options = {
    uri: 'http://smiil.es:2602/current',
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};

rp(options)
    .then(function (data) {
        cronTimeService.addCal(appointments);
    })
    .catch(function (err) {
        // API call failed...
    });
