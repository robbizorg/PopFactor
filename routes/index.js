var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Access = mongoose.model('Access');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PicPop' });
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

router.get('/igcallback', function(req, res, next) {
	console.log("Reached callback");
})

module.exports = router;
