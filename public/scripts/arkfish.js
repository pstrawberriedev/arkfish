/*
  arkfish.js
*/
$(document).ready(function() {
  
  //Hello
  console.log('--> arkfish.js');
  
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

$(window).load(function() {
  $classicContent.slideToggle()
  $vanillaContent.slideToggle();
  $unicornContent.slideToggle();
});

classicTrigger.click(function() {$classicContent.slideToggle();});
vanillaTrigger.click(function() {$vanillaContent.slideToggle();});
unicornTrigger.click(function() {$unicornContent.slideToggle();});
