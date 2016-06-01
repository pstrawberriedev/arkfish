var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//History
var HistorySchema = new Schema({
  date : Number,
  update : String
});
var History = mongoose.model('updates', HistorySchema);

mongoose.connect('mongodb://localhost/updates');