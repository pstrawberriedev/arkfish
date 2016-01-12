var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var History = mongoose.model('updates');

//
// Start Route
//

/* 
  /history
  GET 
*/
router.get('/', function(req, res) {
    res.render(
      'history',
      {title : 'History Post'}
    );
});

/*
  /history
  POST
*/
router.post('/', function(req, res) {
  //Create a new date for the entry
  var currentDate = Math.floor(Date.now() /1000); //unix timestamp - moment(currentDate).format('X');
  console.log(req.file);
  new History(
    {
      date : currentDate,
      history : req.body.history
    }
  )
  .save(function(err, history) {
    console.log(history)
    res.redirect('dinos');
  });
});