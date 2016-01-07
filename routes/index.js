var express = require('express');
var request = require('request');
var router = express.Router();
var steamServerStatus = require('steam-server-status');

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
  }

  //Arkfish
  function getClassic() {
    steamServerStatus.getServerStatus(
      '162.251.70.210', 27066, function(serverInfo) {
        if (serverInfo.error) {
          console.log(serverInfo.error);
          arkInfo.classic.status = "off";
        } else {
          arkInfo.classic = serverInfo;
          arkInfo.classic.status = "on";
        }
        return;
    });
  }

  //Arkfish Vanilla
  function getVanilla() {
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
  }
  
  getUnicorn();
  getClassic();
  getVanilla();
  
}

/* GET home page. */
router.get('/', function(req, res, next) {
  
  getServerInfo();
  console.log(arkInfo);

  res.render('home', { 
    title: 'Status', 
    unicorn: arkInfo.unicorn,
    classic: arkInfo.classic,
    vanilla: arkInfo.vanilla
  });
});

module.exports = router;