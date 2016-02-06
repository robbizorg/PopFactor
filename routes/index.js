var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Access = mongoose.model('Access');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PicPop' });
});

router.get('/analysis', function(req, res, next) {
	res.render('analysis', { title: 'PicPop'});
});

router.post('/authorize', function(req, res, next) {

});


/* Example Mongo Post Code
router.post('/test', function(req, res, next) {
	var accessToken = new Access("daskjdsajn");

	accessToken.save(function(err, accessToken) {
		if (err) {return next(err); } 

		res.json(accessToken);
	});
});
*/ 

router.get('/igcallback', function(req, res) {
	var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	
	
	var accessToken = req.param('code');
	console.log("access_token: " + req.param('code'));

	/*
	var accessToken = new Access(req.param('code'));

	accessToken.save(function(err, accessToken) {
		if (err) {return next(err); } 

		res.json(accessToken);
	});
	*/

	var request = require('request');

	request.post(
	    'https://api.instagram.com/v1/tags/nofilter/media/recent?access_token=' + accessToken,
	    { form: { key: 'value' } },
	    function (error, response, body) {
	        if (!error && response.statusCode == 200) {
	            console.log(body);
	        }
	        console.log("error: " + error);
	        console.log("body" + body);
	    }
	);
})

module.exports = router;
