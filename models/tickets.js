var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TicketSchema = Schema({
  title: {type: String, required: true},
  keywords: {type: String},
  description: {type: String, required: true}
});

TicketSchema
  .virtual('url')
  .get(function () {
    return '/tickets/details/'+this._id;
  });
  TicketSchema
    .virtual('link')
    .get(function () {
      return this.title;
    });

//Export model
module.exports = mongoose.model('Tickets', TicketSchema);
