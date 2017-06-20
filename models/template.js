var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TemplateSchema = Schema({
  title: {type: String, required: true},
  keywords: {type: String},
  body: {type: String, required: true}
});

TemplateSchema
  .virtual('url')
  .get(function () {
    return '/templates/details/'+this._id;
  });


//STATIC METHODS JUST AN EXAMPLE
TemplateSchema.statics.findByTitle = function(name, cb) {
  return this.find({ title: new RegExp(name, 'i') }, cb);
};

//Export model
module.exports = mongoose.model('Template', TemplateSchema);
