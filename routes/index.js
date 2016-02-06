var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'What They Want' });
});

router.post('/authorize', function(req, res, next) {

});

router.get('/igcallback', function(req, res, next) {
	console.log("Reached callback");
})

module.exports = router;
