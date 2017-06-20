var express = require('express');
var router = express.Router();

// Require controller modules
var tickets_controller = require('../controllers/ticketsController');
//GET index Page
router.get('/', tickets_controller.index);
//GET List ALL tickets Page
router.get('/all', tickets_controller.ticketsList);
//GET Create Ticket Page
router.get('/new', tickets_controller.getNewTicket);
//POST Create Ticket
router.post('/new', tickets_controller.postNewTicket);
//GET Ticket Instance
router.get('/details/:id', tickets_controller.getTicketDetails);
//UPDATE Ticket Instance(POST)
router.post('/details/:id', tickets_controller.postTicketDetails);
//Delete Ticket Instance
router.get('/details/remove/:id', tickets_controller.postRemoveTicketInstance);

////////REST////////
/* the SEARCH TEMPLATES REST */
router.get('/search/:id', tickets_controller.getTicketSearch);

module.exports = router;
