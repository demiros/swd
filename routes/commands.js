var express = require('express');
var router = express.Router();

// Require controller modules
var commands_controller = require('../controllers/commandsController');
//GET index Page
router.get('/', commands_controller.index);
//GET List ALL Commands Page
router.get('/all', commands_controller.getCommandsList);
//GET Create Command Page
router.get('/new', commands_controller.getNewCommand);
//POST Create Command
router.post('/new', commands_controller.postNewCommand);
//GET Command Instance
router.get('/details/:id', commands_controller.getCommandDetails);
//UPDATE Command Instance(POST)
router.post('/details/:id', commands_controller.postCommandDetails);
////////REST////////
// the SEARCH TEMPLATES REST
router.get('/search/:id', commands_controller.getCommandSearch);
//Delete Template Instance
router.get('/details/remove/:id', commands_controller.getRemoveCommandInstance);

module.exports = router;
