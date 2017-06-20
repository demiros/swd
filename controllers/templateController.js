var Template = require('./../models/template');
var async = require('async');

exports.index = function(req, res, next){
  res.render('templates/index', {title: "<<--Templates-->>"});
};
exports.templatesList = function(req,res, next) {
  Template.find()
    .sort([['title', 'ascending']])
    .exec(function(err, list_templates){
      if(err) { return next(err); }
      res.render('templates/templates-list', {title: '<<--Templates-->>List', templates_list: list_templates})
      console.log(list_templates);
    });
};
//Create
exports.getNew = function(req, res, next){
  res.render('templates/new-template', {title: "<<--Templates-->>Add"});
};
exports.postNew = function(req, res, next){
  req.checkBody('title', 'Title must be specified').notEmpty();
  req.checkBody('keywords', 'Please add some keyword/s for easier searching later').notEmpty();
  req.checkBody('body', 'Body name must be specified').notEmpty();

  req.sanitize('title').escape();
  req.sanitize('keywords').escape();
  req.sanitize('body').escape();

  req.sanitize('title').trim();
  req.sanitize('keywords').trim();
  req.sanitize('body').trim();

  var errors = req.validationErrors();

  var template = new Template(
    {
      title: req.body.title,
      keywords: req.body.keywords,
      body: req.body.body
    }
  );

  if(errors){
    res.render('new-template', {title: 'There are some errors. No handling of the error messages for now. Investigate, troubleshoot and commit!', errors: errors});
  }
  else{
    template.save(function(err){
      if(err) { return next(err); }

      res.redirect('/templates/');
    });
  }
};

//GET Details page
exports.getTemplateDetails = function(req, res, next) {
  var instance = Template.findById(req.params.id);

  instance
    .exec(function(err, template_details){
      if(err) { return next(err); }
      res.render('templates/template-details', {title:'Details page for ' + template_details.title, template_details: template_details})
    });
};
//POST Details page
//Update specific Template Controller
exports.postTemplateDetail = function(req, res, next) {
  //Sanitize and validate the data that is coming

  //build the object from the form
  var template = new Template(
    {
      title: req.body.title,
      keywords: req.body.keywords,
      body: req.body.body,
      _id:req.params.id
    }
  );
  //Wrap the following into if/else construction for the validating that should be done in step1.
  console.log(template);
  Template.findByIdAndUpdate(req.params.id, template, {}, function(err, the_template) {
    if (err) { return next(err); }
    //res.redirect(the_template.url);
    res.redirect('/templates/all');
  });
};
//////
///REST///
//////

// ALL TEMPLATES LIST REST
exports.templatesListRest = function(req,res, next) {
  Template.find()
    .sort([['title', 'ascending']])
    .exec(function(err, list_templates){
      if(err) { return next(err); }
      res.json(list_templates);
    });
};
// TEMPLATE DETAIL LIST REST
exports.getTemplateDetailRest = function(req, res, next) {
  var instance = Template.findById(req.params.id);

  Template.findById(req.params.id)
    .exec(function(err, template_details){
      if(err) { return next(err); }
      var returnVar = {name: template_details.title};
      res.json(returnVar);
    });
};
////Delete Template Instance(REST)
exports.getRemoveTemplateInstance = function(req, res, next) {
  var templateID = req.params.id;
  Template.remove({_id: templateID}, function(err){
    if (err) { return next(err); }
    res.redirect('/templates/all');
  });
};
// SEARCH TEMPLATES REST
exports.getTemplateSearch = function(req, res, next) {
   var searchPhrase = req.params.id;
   var regularExpression = new RegExp(searchPhrase, 'i');
   console.log(regularExpression);
  //Template.find({title: regularExpression} , function (err, templates) {
  Template.find({"$or": [ {"title": regularExpression} , {body: regularExpression }]}, function (err, templates) {
    if (err) { return next(err); }
    res.json(templates);
  });
};
