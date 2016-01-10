var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Dino = mongoose.model('dinos');
var multer  = require('multer');

//Image Upload stuff
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() +'.jpg')
  },
  limits: {fileSize:150000}
});
var upload = multer({ storage: storage });

//
// Start Route
//

/* 
  /dinos 
  GET 
*/
router.get('/', function(req, res) {
  Dino.find(function(err, dinos){
 //   console.log(dinos)
    res.render(
      'dinos',
      {title : 'Dinos', dinos : dinos}
    );
  });
});

/*
  /dinos
  POST
*/
router.post('/', upload.single('dinoPicture'), function(req, res) {
  //Create a new date for the entry
  var currentDate = Math.floor(Date.now() /1000); //unix timestamp - moment(currentDate).format('X');
  console.log(req.file);
  new Dino(
    {
      server : req.body.dinoServer,
      name : req.body.dinoName,
      owner : req.body.dinoOwner,
      dateAdded : currentDate,
      mortality : req.body.dinoMortality,
      notes : req.body.dinoNotes,
      picture : (req.file) ? req.file.filename : ""
    }
  )
  .save(function(err, dino) {
    console.log(dino)
    res.redirect('dinos');
  });
});

/*
  /dinos/{dino.id}
  GET
*/
router.get('/:dino_id', function(req, res) {
  Dino.findById(req.params.dino_id, function(err, dino) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(dino);
      res.render(
        'dinos-single',
        {title : 'Edit Dino', dino : dino}
      );
    }
  });
});

/*
  /dinos/{dino.id}
  PUT
*/
router.post('/:dino_id', function(req, res) {
  console.log('got a post biches', req.params, req.body);
  Dino.findById(req.params.dino_id, function(err, dino) {
    console.log('doing some findbyId');
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      //update only these fields
      dino.server = req.body.dinoServer;
      dino.name = req.body.dinoName;
      dino.owner = req.body.dinoOwner;
      dino.mortality = req.body.dinoMortality;
      dino.notes = req.body.dinoNotes;
      //do the update
      dino.save(function(err, dino) {
        console.log(dino);
        res.redirect('/dinos');
      });
    }
  });
});


module.exports = router;