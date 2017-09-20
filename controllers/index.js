var express = require('express');
var router = express.Router();

router.use('/users', require('./usersController'));

router.get('/', function(req, res){
    res.render('home', {
            title: 'Home',
            message: 'dies ist ein test'
        });
});

module.exports = router;
