var async = require('async');

//GET index
exports.index = function(req, res, next){
  res.render('admin/index', {title: "Admin's section"});
};
