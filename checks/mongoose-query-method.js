var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/sgm-tests';
mongoose.connect(mongoDB);

var Schema = mongoose.Schema;

var animalSchema = new Schema({ name: String });
animalSchema.methods.speak = function(){
  var greeting = this.name ? "Meow name is " + this.name : "I don't have a name";
  console.log(greeting);
}

animalSchema.statics.findByName = function(name, cb) {
  return this.find({ name: new RegExp(name, 'i') }, cb);
};


var Kitten = mongoose.model('Kitten', animalSchema);

Kitten.findByName('Fluffy', function(err, animals) {
  console.log(animals);
});

Kitten.find({ name: /^Fluff/ }, function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
});
