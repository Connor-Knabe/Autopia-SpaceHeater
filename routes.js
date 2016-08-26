var lInfo = require('./lInfo');
var heaterService = require('./heaterService');

module.exports = (function() {
    var router = require('express').Router();
    var onTime;
	router.get('/', function(req,res){
	    res.send({"status":"200"});
	});

	router.post('/heaterOn', function(req,res){
        if (req.body.kay && lInfo.kay===req.body.kay) {
            if(req.body.time){
                onTime = req.body.time;
                console.log('on time', onTime);
                heaterService.turnOnTimed(onTime);
                res.send({"status":"turned on heater"});
            } else {
                res.send({"status":"failed to turn on heater"});
            }
        } else {
            res.status(403).send('Unauthorized!');
        }

	});

    router.post('/heaterOff', function(req,res){
        if (req.body.kay && lInfo.kay===req.body.kay) {
            heaterService.turnOff();
            res.send({"status":"turned off heater"});

        } else {
            res.status(403).send('Unauthorized!');
        }
	});

    return router;
})();
