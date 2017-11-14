var express = require('express');
var router = express.Router();
var util = require('util');

router.use('/users', require('./usersController'));
router.use('/dormip', require('./dormIpController'));

router.get('/', function(req, res){
    res.render('home', {
            title: 'Home',
            message: util.inspect(req.user)
        });
});

module.exports = router;
