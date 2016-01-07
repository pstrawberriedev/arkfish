/*
  arkfish.js
*/
$(document).ready(function() {
  console.log('--> arkfish.js');
});

// Flowtype Init
// http://simplefocus.com/flowtype/
$('body').flowtype({
   minimum   : 320,
   maximum   : 1980,
   minFont   : 10,
   maxFont   : 20,
   fontRatio : 30
});

// Grab Server version with regex
$(document).ready(function() {
  
  function grabServerVersion() {
    
    var replaceString = $('h4 span');
    replaceString.each(function() {
      if($(this).text().length) {
        var regExp = /\(([^)]+)\)/;
        var getit = $(this).text();
        var matches = regExp.exec(getit);
        //console.log(matches[1]);
        $(this).text(matches[1]);
        $(this).show();
      }
    })
  }
  grabServerVersion();
  
});

// Server Accordions GSAP (YES I KNOW IT'S REALLY GHETTO AND BAD OK)
var classicTrigger = $('#cla');
var vanillaTrigger = $('#van');
var unicornTrigger = $('#uni');
var $classicContent = $('#claInfo');
var $vanillaContent = $('#vanInfo');
var $unicornContent = $('#uniInfo');

classicTrigger.on("click touchstart", function() {
  if(!$(this).hasClass('active')) {
    $(this).addClass('active');
    TweenLite.to($classicContent, 0.2, {height:120});
  } else {
    $(this).removeClass('active');
    TweenLite.to($classicContent, 0.2, {height:0});
  }
});
vanillaTrigger.on("click touchstart", function() {
  if(!$(this).hasClass('active')) {
    $(this).addClass('active');
    TweenLite.to($vanillaContent, 0.2, {height:120});
  } else {
    $(this).removeClass('active');
    TweenLite.to($vanillaContent, 0.2, {height:0});
  }
});
unicornTrigger.on("click touchstart", function() {
  if(!$(this).hasClass('active')) {
    $(this).addClass('active');
    TweenLite.to($unicornContent, 0.2, {height:120});
  } else {
    $(this).removeClass('active');
    TweenLite.to($unicornContent, 0.2, {height:0});
  }
});