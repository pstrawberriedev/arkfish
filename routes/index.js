var express = require('express');
var request = require('request');
var CronJob = require('cron').CronJob;
var steamServerStatus = require('steam-server-status');
var SourceQuery = require('sourcequery');
var router = express.Router();

//Arkfish Classic @ 162.251.70.210:27066
//Arkfish Vanilla @ 149.202.195.144:27057
//Arkfish Unicorn Kingdom @ arkfish.net:27015

//Set up the objex
var arkInfo = {};
  arkInfo.unicorn = {},
  arkInfo.classic = {},
  arkInfo.vanilla = {};

//Top-Level Function to pull into page GET
function getServerInfo() {

  //Arkfish Unicorn Kingdom
  function getUnicorn() {
    //Server Info
    steamServerStatus.getServerStatus(
      'arkfish.net', 27015, function(serverInfo) {
        if (serverInfo.error) {
          console.log(serverInfo.error);
          arkInfo.unicorn.status = "off";
        } else {
          arkInfo.unicorn = serverInfo;
          arkInfo.unicorn.status = "on";
        }
    });
    //Player Info
    var sq = new SourceQuery(1000);
    sq.open('arkfish.net', 27015);
    sq.getPlayers(function(err, players){
      if(err) {
        console.log(err);
      } else {
        //setup players to be array
        arkInfo.unicorn.players = [];
        players.forEach(function(player){
          arkInfo.unicorn.players.push(player.name);
        });
      }
    });
  }

  //Arkfish
  function getClassic() {
    //Server Info
    steamServerStatus.getServerStatus(
      '162.251.70.210', 27066, function(serverInfo) {
        if (serverInfo.error) {
          console.log(serverInfo.error);
          arkInfo.classic.status = "off";
        } else {
          arkInfo.classic = serverInfo;
          arkInfo.classic.status = "on";
        }
    });
    //Player Info
    var sq = new SourceQuery(1000);
    sq.open('162.251.70.210', 27066);
    sq.getPlayers(function(err, players){
      if(err) {
        arkInfo.classic.players = err;
      } else {
        //setup players to be array
        arkInfo.classic.players = [];
        var playersArray = arkInfo.classic.players;
        //do the loop
        for (var key in players) {
          if (players.hasOwnProperty(key)) {
            var allPlayers = players[key].name;
            playersArray.push(allPlayers);
          }
        }
      }
    });
  }

  //Arkfish Vanilla
  function getVanilla() {
    //Server Info
    steamServerStatus.getServerStatus(
      '149.202.195.144', 27057, function(serverInfo) {
        if (serverInfo.error) {
          console.log(serverInfo.error);
          arkInfo.vanilla.status = "off";
        } else {
          arkInfo.vanilla = serverInfo;
          arkInfo.vanilla.status = "on";
        }
    });
    //Player Info
    var sq = new SourceQuery(1000);
    sq.open('149.202.195.144', 27057);
    sq.getPlayers(function(err, players){
      if(err) {
        arkInfo.vanilla.players = err;
      } else {
        //setup players to be array
        arkInfo.vanilla.players = [];
        var playersArray = arkInfo.vanilla.players;
        //do the loop
        for (var key in players) {
          if (players.hasOwnProperty(key)) {
            var allPlayers = players[key].name;
            playersArray.push(allPlayers);
          }
        }
      }
    });
  }
  
  //Run the sub-funx lol
  getUnicorn();
  getClassic();
  getVanilla();
  
}

//Get Initial Infoz (doesn't actually work. oh.)
getServerInfo();

//Ghetto cron every 45sec to update server infoz so it doesn't time out
//new CronJob('*/45 * * * * *', function() { //Prod
new CronJob('*/90 * * * * *', function() { //TEST
  getServerInfo();
  console.log('--------------------------');
  console.log('--------Got Info----------');
  console.log('--------------------------');
  console.log(arkInfo.unicorn);
}, null, true, 'America/Denver');

/* GET home page. */
router.get('/', function(req, res, next) {
  //Just passing data through to views
  res.render('home', { 
    title: 'Status', 
    unicorn: arkInfo.unicorn,
    classic: arkInfo.classic,
    vanilla: arkInfo.vanilla
  });
});

module.exports = router;