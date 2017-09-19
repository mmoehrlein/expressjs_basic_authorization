var express = require('express');
var router = express.Router();

router.use('/users', require('./users'));

router.get('/', function(req, res){
    res.locals.notifications.errors.push("dies ist noch ein test");
    res.render('home', {
        title: 'Home',
        message: 'dies ist ein test'
    });
});

module.exports = router;