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
$('#cla').click(function() {$('#claInfo').slideToggle();});
$('#van').click(function() {$('#vanInfo').slideToggle();});
$('#uni').click(function() {$('#uniInfo').slideToggle();});

// Dino Glossary
$('#pageDinos .singleDino').each(function() {
  var fillDate = $(this).find('.added span');
  var dateElement = $(this).find('.datePop');
  
  var dateUnformatted = dateElement.text();
  console.log(dateUnformatted);
  var relativeDate = moment(dateUnformatted, 'X').format("MM/D/YY - h:mma");
  var fromDate = moment(dateUnformatted, 'X').fromNow();
  
  fillDate.text(fromDate);
});