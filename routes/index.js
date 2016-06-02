var express = require('express');
var request = require('request');
var moment = require('moment');
var CronJob = require('cron').CronJob;
var steamServerStatus = require('steam-server-status');
var SourceQuery = require('sourcequery');
var router = express.Router();


//Set up the objex
var arkInfo = {};
    arkInfo.updated = {};
    arkInfo.josh = {};
    

//Top-Level Function to pull into page GET
function getServerInfo() {

	//Server Info
	steamServerStatus.getServerStatus(
		'ark.josh.care', 27015, function(serverInfo) {
			if (serverInfo.error) {
				console.log(serverInfo.error);
				arkInfo.josh.status = "down";
			} else {
				arkInfo.josh = serverInfo;
				arkInfo.josh.status = "up";
        
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
	});
	
}

function pushDate() {
  var currentDate = moment();
  var toDate = moment(currentDate).tz("America/Denver").format('MMM Do YYYY hh:mma z');
  var minutesDate = moment(currentDate).tz("America/Denver").format('hh:mma z');
  var nowDate = moment(toDate, 'MMM Do hh:mma').fromNow();
  arkInfo.updated.date = toDate;
  arkInfo.updated.minutes = minutesDate;
  
  console.log(arkInfo.updated);
}

//Ghetto cron every 59sec to update server infoz so it doesn't time out
new CronJob('00 */2 * * * *', function() {
//new CronJob('*/30 * * * * *', function() {
  getServerInfo();
  pushDate();
  console.log('--------------------------');
  console.log('--------Got Info----------');
  console.log('--------------------------');
  console.log(arkInfo);
}, null, true, 'America/Denver');

router.use('/status', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
	
  //Just passing data through to views
  res.render('home', { 
    title: 'Status', 
    josh: arkInfo.josh,
    updated: arkInfo.updated
  });
	
});

/* GET status page. */
router.get('/status', function(req, res, next) {
	
  //Just passing data through to views
  res.json(arkInfo);
	
});

module.exports = router;
