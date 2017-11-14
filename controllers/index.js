var express = require('express');
var router = express.Router();
var util = require('util');
var auth = require('../middlewares/authMiddleware');


router.use('/users', require('./usersController'));
router.use('/dormip', require('./dormIpController'));
router.use('/slides', require('./slidesController'));

router.get('/', function(req, res){
    res.render('home', {
        title: 'Home',
        message: util.inspect(req.user)
    });
});

router.get('/home', auth, function(req, res){
    res.render('home', {
        title: 'Home',
        message: 'Hallo ' + req.user.user.username
    });
});

module.exports = router;
