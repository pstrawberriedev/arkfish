var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//Dinos
var Dino = new Schema({
      server : String,
      name : String,
      species : String,
      owner : String,
      dateAdded : Number,
      mortality : String,
      notes : String
});
mongoose.model('dinos', Dino);

mongoose.connect('mongodb://localhost/arkfish_test1');