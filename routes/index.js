var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var cloudinary = require("cloudinary");
var currentUser = "";
var currentName = "";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PopFactor' });
});

router.get('/#/analysis', function(req, res, next) {
	res.render('analysis', { title: 'PopFactor'});
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
	        	
	        	var data = JSON.parse(body);
	        	var accessToken = data.access_token;
	        	var userName = data.user["username"];
	        	currentName = userName;
	        	
	            request.get(
				    'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + accessToken,
				    {form: {count: '2'}},
				    function (error, response, body2) {
				        if (response.statusCode == 200) {
				            
				            var userMedia = JSON.parse(body2);
				            console.log(userMedia);
				            var mongoData = [];
				            var colorData = [];
				            userMedia.data.forEach(function(picture) {
				            	
				            	console.log("picture in loop" + picture);
				            	var selectedPic = picture["images"]["standard_resolution"]["url"];
				            	
				            	//cloudinary calls -- color analysis
					           	cloudinary.uploader.upload(selectedPic, 
	                           		function(result) { 
	                           			console.log(result);
	                           			console.log("picture in cloudinary " + picture);
	                           			//var colors = JSON.parse(result);
	                           			colorData = result["predominant"]["google"];

	                           			console.log("the image " + picture["likes"]["count"]);
	                           			console.log("tags " + picture["tags"]);

	                           			var tags = picture["tags"];
				            			
				            			var likes = picture["likes"]["count"];

	                           			console.log("colorData " + colorData);
				           				mongoData.push([likes, colorData, tags]);

	                           		}, { colors: true}); 

								console.log("picture " + picture);

				            });
					        
					        setTimeout(function() {
					        	User.findOne({userID: currentUser}, function(err, user) {
									if (err) return done(err,null);
									if (user) {
										console.log("mongoData " + mongoData);
										user.data = mongoData;
										user.name = userName;
										user.save(function(err) {
											if (err) {return next(err); } 
											res.json(user);
										});
									}
								})

							}, 2000); 


					    }
							  

				        })
				        
				    };
	        }
	);

	
});

router.get('/doSomething', function(req, res) {
	console.log("do something");
});

router.get('/authtokencallback', function(req, res) {
	console.log("reached access token callback");
});

router.get('/getName', function(req, res) {
	res.json(currentName);
})

router.post('/saveID', function(req, res, next) {

	var userID = req.body.userID;
	var data = null;

	var user = new User();
	user.userID = userID;
	user.data = data;

	currentUser = userID;

	user.save(function(err, accessToken) {
		if (err) {return next(err); } 

		res.json(user);
	});
});

router.get('/getColorData', function(req, res) {
	//var userID = req.body.userID;
	var userID = currentUser;
	console.log("Houston we have a situation. " + userID);
	User.findOne({userID: userID}, function(err, user) {
		if (user) {
			console.log("User.data " + user);
			//return res.json({data: user.data});
			return res.json(user);
		} else {
			console.log("Houston we have a problem.");
		}
	})
});



module.exports = router;
