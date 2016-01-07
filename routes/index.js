var express = require('express');
var request = require('request');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
	var arkInfo = {};
	request('https://api.ark.bar/v1/server/arkfish.net/27015', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var arkInfo = JSON.parse(body);
			console.log('all\n' + body);
			console.log('Status: ' + arkInfo.status);
		}
	})
  res.render('home', { title: 'Arkfish', info: arkInfo });
});

module.exports = router;
