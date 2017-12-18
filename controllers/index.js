var express = require('express');
var router = express.Router();
var util = require('util');
var auth = require('../middlewares/authMiddleware');
var resGen = require('../helpers/responseGenerator');


router.use('/users', require('./usersController'));
router.use('/dormip', require('./dormIpController'));
router.use('/slides', require('./slidesController'));

router.get('/', auth(['admin']), function(req, res){
    var data = require('../helpers/dormIPLoader');

    res.json(resGen.response("test", data));
});

module.exports = router;
