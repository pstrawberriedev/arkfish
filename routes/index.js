var express = require('express');
var request = require('request');
var CronJob = require('cron').CronJob;
var steamServerStatus = require('steam-server-status');
var SourceQuery = require('sourcequery');
var router = express.Router();
var mongoose = require('mongoose');
var History = mongoose.model('updates');


//Set up the objex
var arkInfo = {};
		arkInfo.josh = {};

//Top-Level Function to pull into page GET
function getServerInfo() {

	//Server Info
	steamServerStatus.getServerStatus(
		'ark.josh.care', 27015, function(serverInfo) {
			if (serverInfo.error) {
				console.log(serverInfo.error);
				arkInfo.josh.status = "off";
			} else {
				arkInfo.josh = serverInfo;
				arkInfo.josh.status = "on";
			}
	});
	//Player Info
	var sq = new SourceQuery(1000);
	sq.open('ark.josh.care', 27015);
	sq.getPlayers(function(err, players){
		if(err) {
			console.log(err);
		} else {
			//setup players to be array
			arkInfo.josh.players = [];
			players.forEach(function(player){
				arkInfo.josh.players.push(player.name);
			});
		}
	});
}

//Get Initial Infoz
getServerInfo();

//Ghetto cron every 59sec to update server infoz so it doesn't time out

new CronJob('*/59 * * * * *', function() {
  getServerInfo();
  console.log('--------------------------');
  console.log('--------Got Info----------');
  console.log('--------------------------');
  console.log(arkInfo);
}, null, true, 'America/Denver');

var history = {};

/* GET home page. */
router.get('/', function(req, res, next) {
	
	History.find(function(err, histories){
		if(err) {history = "sorry, error: " + err}
		else {
			history = histories;
		}
	});
	
  //Just passing data through to views
  res.render('home', { 
    title: 'Status', 
    josh: arkInfo.josh,
		history: history
  });
	
});

router.post('/', function(req, res) {
  //Create a new date for the entry
  var currentDate = Math.floor(Date.now() /1000); //unix timestamp - moment(currentDate).format('X');
  new History(
    {
      date : currentDate,
      update : req.body.update
    }
  )
  .save(function(err, history) {
    console.log(history)
    res.redirect('/');
  });
});

module.exports = router;