var Ticket = require('./../models/tickets');
var async = require('async');

//GET index
exports.index = function(req, res, next){
  res.render('tickets/index', {title: "<<--Tickets-->>"});
};
//GET Create Ticket
exports.getNewTicket = function(req, res, next){
  res.render('tickets/new-ticket', {title: "<<--Tickets-->>ADD"});
};

//POST Create Ticket
exports.postNewTicket = function(req, res, next){
  req.checkBody('title', 'Title must be specified').notEmpty();
  req.checkBody('keywords', 'Please add some keyword/s for easier searching later').notEmpty();
  req.checkBody('body', 'Description name must be specified').notEmpty();

  req.sanitize('title').escape();
  req.sanitize('keywords').escape();
  req.sanitize('body').escape();

  req.sanitize('title').trim();
  req.sanitize('keywords').trim();
  req.sanitize('body').trim();

  var errors = req.validationErrors();

  var ticket = new Ticket(
    {
      title: req.body.title,
      keywords: req.body.keywords,
      description: req.body.body
    }
  );

  if(errors){
    var titleError = 'There are some errors. No handling of the error messages for now. Investigate, troubleshoot and commit!' + errors
    res.render('/new-ticket', {title: titleError, errors: errors});
  }
  else{
    ticket.save(function(err){
      if(err) { return next(err); }
      //, {saveMsg: "Saved!"}
      res.redirect('/tickets/');
    });
  }
};
//GET List tickets
exports.ticketsList = function(req,res, next) {
  Ticket.find()
    .sort([['description', 'ascending']])
    .exec(function(err, list_tickets){
      if(err) { return next(err); }
      res.render('tickets/list-tickets', {title: '<<--Tickets-->>List', tickets_list: list_tickets})
      console.log(list_tickets);
    });
};
//GET Ticket Details / Instance
exports.getTicketDetails = function(req, res, next) {
  var instance = Ticket.findById(req.params.id);

  instance
    .exec(function(err, ticket_details){
      if(err) { return next(err); }
      res.render('tickets/ticket-details', {title:'You are going to edit the ticket.', ticket_details: ticket_details})
    });
};
//UPDATE Ticket Details / Instance
exports.postTicketDetails = function(req, res, next) {
  //Sanitize and validate the data that is coming

  //build the object from the form
  var ticket = new Ticket(
    {
      title: req.body.title,
      keywords: req.body.keywords,
      description: req.body.description,
      _id:req.params.id
    }
  );
  //Wrap the following into if/else construction for the validating that should be done in step1.
  console.log(ticket);
  Ticket.findByIdAndUpdate(req.params.id, ticket, {}, function(err, the_ticket) {
    if (err) { return next(err); }
    //res.redirect(the_ticket.url);
    res.redirect('/tickets/all');
  });
};
////Delete Ticket instance
exports.postRemoveTicketInstance = function(req, res, next) {
  var ticketID = req.params.id;
  Ticket.remove({_id: ticketID}, function(err){
    if (err) { return next(err); }
    res.redirect('/tickets/all');
  });
};
//////RESR//////
// SEARCH TICKETs REST
exports.getTicketSearch = function(req, res, next) {
   var searchPhrase = req.params.id;
   var regularExpression = new RegExp(searchPhrase, 'i');
  //  console.log(regularExpression);
    Ticket.find({"$or": [ {"description": regularExpression} , {keywords: regularExpression }]}, function (err, tickets) {
    if (err) { return next(err); }
    res.json(tickets);
  });
};
