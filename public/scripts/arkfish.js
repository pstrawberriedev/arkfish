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
  
  //Nav
  var navTrigger = $('header img'),
      navContent = $('nav');
  navTrigger.click(function() {
    navContent.toggleClass('active');
    navContent.slideToggle();
  });
  $("html").click(function(e){
    if($(e.target).closest(navTrigger).length === 0) {
      $("nav:visible").slideUp();
    }
});
  
  if($('#pageHome').length) {
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
  }
});

// Server Status Accordions
$('#cla').click(function() {$('#claInfo').slideToggle(180);});
$('#van').click(function() {$('#vanInfo').slideToggle(180);});
$('#uni').click(function() {$('#uniInfo').slideToggle(180);});
$('#exp').click(function() {$('#expInfo').slideToggle(180);});

// Dino Glossary New Dino
$('#addDino').click(function() {
  $('#newDino').slideToggle();
});

// Single Dino Edit Dino
$('#editDino').click(function() {
  $('#newDino').slideToggle();
});

// Dino Glossary Dates
$('.singleDino').each(function() {
  var fillDate = $(this).find('.added span');
  var dateElement = $(this).find('.datePop');
  
  var dateUnformatted = dateElement.text();
  console.log(dateUnformatted);
  var relativeDate = moment(dateUnformatted, 'X').format("MM/D/YY - h:mma");
  var fromDate = moment(dateUnformatted, 'X').fromNow();
  
  fillDate.text(fromDate);
});