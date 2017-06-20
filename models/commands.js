var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommandSchema = Schema({
  title: {type: String, required: true},
  keywords: {type: String},
  description: {type: String}
});

CommandSchema
  .virtual('url')
  .get(function () {
    return '/commands/details/'+this._id;
  });

//Export model
module.exports = mongoose.model('Commands', CommandSchema);
