var express = require('express');
var router = express.Router();

// Require controller modules
var admin_controller = require('../controllers/adminController');

/* GET template home page. */
router.get('/', admin_controller.index);

module.exports = router;
