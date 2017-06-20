var express = require('express');
var router = express.Router();

// Require controller modules
var template_controller = require('../controllers/templateController');

/* GET template home page. */
router.get('/', template_controller.index);
/* GET All templates as a list/table. */
router.get('/all', template_controller.templatesList);
/* GET template NEW page. */
router.get('/new', template_controller.getNew);
/* POST NEW template */
router.post('/new', template_controller.postNew);
/* GET template DETAIL page. */
router.get('/details/:id', template_controller.getTemplateDetails);
/* POST template DETAIL page. aka UPDATE a template */
router.post('/details/:id', template_controller.postTemplateDetail);


////////REST////////
/* the SEARCH TEMPLATES REST */
router.get('/search/:id', template_controller.getTemplateSearch);
/* the ALL TEMPLATES LIST REST */
router.get('/all-rest', template_controller.templatesListRest);
/* GET template DETAIL page REST. */
router.get('/details-rest/:id', template_controller.getTemplateDetailRest);
//Delete Template Instance
router.get('/details/remove/:id', template_controller.getRemoveTemplateInstance);

//Samples
//
// /* GET request to delete Author. */
// router.get('/author/:id/delete', author_controller.author_delete_get);
//
// // POST request to delete Author
// router.post('/author/:id/delete', author_controller.author_delete_post);
//
// /* GET request to update Author. */
// router.get('/author/:id/update', author_controller.author_update_get);
//
// // POST request to update Author
// router.post('/author/:id/update', author_controller.author_update_post);

module.exports = router;
