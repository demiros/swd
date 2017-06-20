var Command = require('./../models/commands');
var async = require('async');

//GET index
exports.index = function(req, res, next){
  res.render('commands/index', {title: "<<--Commands-->>"});
};
//GET Create Command
exports.getNewCommand = function(req, res, next){
  res.render('commands/new-command', {title: "<<--Commands-->>ADD!"});
};

//POST Save Command
exports.postNewCommand = function(req, res, next){
  req.checkBody('title', 'Title must be specified').notEmpty();
  // req.checkBody('keywords', 'Please add some keyword/s for easier searching later').notEmpty();
  req.checkBody('body', 'Description name must be specified').notEmpty();

  req.sanitize('title').escape();
  req.sanitize('keywords').escape();
  req.sanitize('body').escape();

  req.sanitize('title').trim();
  req.sanitize('keywords').trim();
  req.sanitize('body').trim();

  var errors = req.validationErrors();

  var command = new Command(
    {
      title: req.body.title,
      keywords: req.body.keywords,
      description: req.body.body
    }
  );

  if(errors){
    var titleError = 'There are some errors. No handling of the error messages for now. Investigate, troubleshoot and commit!' + errors
    res.render('/new-command', {title: titleError, errors: errors});
  }
  else{
    command.save(function(err){
      if(err) { return next(err); }
      //, {saveMsg: "Saved!"}
      res.redirect('/commands/');
    });
  }
};

//GET List Commands
exports.getCommandsList = function(req,res, next) {
  Command.find()
    .sort([['description', 'ascending']])
    .exec(function(err, list_commands){
      if(err) { return next(err); }
      res.render('commands/list-commands', {title: 'All Tickets below!', commands_list: list_commands})
      console.log(list_commands);
    });
};
//GET Command Details / Instance
exports.getCommandDetails = function(req, res, next) {
  var instance = Command.findById(req.params.id);

  instance
    .exec(function(err, command_details){
      if(err) { return next(err); }
      res.render('commands/command-details', {title:'<<--Commands-->>EDIT', command_details: command_details})
    });
};
//UPDATE Command Details / Instance
exports.postCommandDetails = function(req, res, next) {
  //Sanitize and validate the data that is coming

  //build the object from the form
  var command = new Command(
    {
      title: req.body.title,
      keywords: req.body.keywords,
      description: req.body.description,
      _id:req.params.id
    }
  );
  //Wrap the following into if/else construction for the validating that should be done in step1.
  console.log(command);
  Command.findByIdAndUpdate(req.params.id, command, {}, function(err, the_command) {
    if (err) { return next(err); }
    //res.redirect(the_ticket.url);
    res.redirect('/commands/all');
  });
};
////Delete Ticket instance
exports.getRemoveCommandInstance = function(req, res, next) {
  var commandID = req.params.id;
  Command.remove({_id: commandID}, function(err){
    if (err) { return next(err); }
    res.redirect('/commands/all');
  });
};
//////REST//////
// SEARCH Commands REST
exports.getCommandSearch = function(req, res, next) {
   var searchPhrase = req.params.id;
   var regularExpression = new RegExp(searchPhrase, 'i');
  //  console.log(regularExpression);
  // Command.find({title: regularExpression} , function (err, commands) {
  Command.find({"$or": [ {"title": regularExpression} , {description: regularExpression }, {keywords: regularExpression }]}, function (err, commands) {
    if (err) { return next(err); }
    res.json(commands);
  });
};
