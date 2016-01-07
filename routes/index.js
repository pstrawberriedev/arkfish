var express = require('express');
var request = require('request');
var router = express.Router();
var steamServerStatus = require('steam-server-status');

var unicornInfo = {};

//Functions for Servers
function getStatusUnicorn() {
  steamServerStatus.getServerStatus(
    'arkfish.net', 27015, function(serverInfo) {
      if (serverInfo.error) {
        console.log(serverInfo.error);
      } else {
        console.log(serverInfo);
        unicornInfo = serverInfo;
        //console.log("game: " + serverInfo.gameName);
        //console.log("server name: " + serverInfo.serverName);
        //console.log("players: " + serverInfo.numberOfPlayers + "/" + serverInfo.maxNumberOfPlayers)
      }
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  
  getStatusUnicorn();

  res.render('home', { 
    title: 'Status', 
    unicornInfo: unicornInfo
  });
});

module.exports = router;

/*
var arkInfo = {};
request('https://api.ark.bar/v1/server/arkfish.net/27015', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var arkInfo = JSON.parse(body);
    console.log('all\n' + body);
    console.log('Status: ' + arkInfo.status);
  }
})*/