var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//Dinos
var DinoSchema = new Schema({
  server : String,
  name : String,
  species : String,
  owner : String,
  dateAdded : Number,
  mortality : String,
  notes : String,
  picture : String
});
var Dino = mongoose.model('dinos', DinoSchema);

mongoose.connect('mongodb://localhost/arkfish_test1');