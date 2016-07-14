var rp = require('request-promise');
var timeHelper = require("./timeHelper");

var options = {
    uri: 'http://smiil.es:2602/current',
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};

rp(options)
    .then(function (data) {
        console.log('User has data!', data);
        var actual = timeHelper.grabAppointments(data);
        console.log('actual',actual);
    })
    .catch(function (err) {
        // API call failed...
    });
