var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var cloudinary = require("cloudinary");

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
	
	var igCode = req.param('code');
	console.log("code: " + req.param('code'));

	/*
	var accessToken = new Access(req.param('code'));

	accessToken.save(function(err, accessToken) {
		if (err) {return next(err); } 

		res.json(accessToken);
	});
	*/
	var request = require('request');
	request.post(
	    'https://api.instagram.com/oauth/access_token',
	    { form: { client_id: 'd020ad35b9014622b589d19a6d1130eb', client_secret: "2cbceba83b8d40a19e1e45860e3c438d", grant_type:"authorization_code", redirect_uri: "http://localhost:3000/igcallback", code: igCode } },
	    function (error, response, body) {
	    	//console.log(body);
	        if (!error && response.statusCode == 200) {
	        	console.log(body);
	        	var data = JSON.parse(body);
	        	var accessToken = data.access_token;
	        	console.log(accessToken);
	            request.get(
				    'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + accessToken,
				    //{form: {access_token: accessToken, count: '5'}},
				    function (error, response, body2) {
				        if (response.statusCode == 200) {
				            console.log(body2);
				            var userMedia = JSON.parse(body2);
				            console.log("some data" + userMedia.data[0]["images"]["low_resolution"]["url"]);
				            var picture = userMedia.data[0]["images"]["low_resolution"]["url"];
				            

				            //cloudinary calls
				           	cloudinary.uploader.upload(picture, 
                           		function(result) { 
                           			console.log(result);
                           			//var colors = JSON.parse(result);
                           			var arrayOfColors = result["predominant"]["google"];
                           			for (color in arrayOfColors) {
                           				console.log(arrayOfColors[color][0]);
                           			}
                           		}, { colors: true }); 

				        }
				        
				    }
				);
	        }
	    }
	);

	
	/*
	
	*/
})

router.get('/authtokencallback', function(req, res) {
	console.log("reached access token callback");
});

router.post('/saveID', function(req, res, next) {

	var userID = req.body.userID;
	var data = null;

	var user = new User();
	user.userID = userID;
	user.data = data;

	user.save(function(err, accessToken) {
		if (err) {return next(err); } 

		res.json(user);
	});
});

module.exports = router;
