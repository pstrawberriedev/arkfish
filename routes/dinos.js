var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Dino = mongoose.model('dinos');

/* GET form. */
router.get('/', function(req, res) {
  Dino.find(function(err, dinos){
    console.log(dinos)
    res.render(
      'dinos',
      {title : 'Dinos', dinos : dinos}
    );
  });
});

/* POST form. */
router.post('/', function(req, res) {
  //Create a new date for the entry
  var currentDate = Math.floor(Date.now() /1000); //unix timestamp - moment(currentDate).format('X');
  
  new Dino(
    {
      server : req.body.dinoServer,
      name : req.body.dinoName,
      species : req.body.dinoSpecies,
      owner : req.body.dinoOwner,
      dateAdded : currentDate,
      mortality : req.body.dinoMortality,
      notes : req.body.dinoNotes
    }
  )
  .save(function(err, dino) {
    console.log(dino)
    res.redirect('dinos');
  });
  
});

module.exports = router;