var spaceHeaterInfo = require('./spaceHeaterInfo');
module.exports = (function() {
    var router = require('express').Router();
	router.get('/', function(req,res){
	    res.send({"status":"200"});
	});

	router.post('/startFloat', function(req,res){
        if (spaceHeaterInfo.kay===req.body.spaceHeaterKay) {

        }

	});


	router.get('/endFloat', function(req,res){
		Float.endFloat();
	    res.send({"status":"200"});
	});

    return router;
})();
