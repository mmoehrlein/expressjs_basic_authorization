var express = require('express');
var router = express.Router();

router.use('/users', require('./usersController'));

router.get('/', function(req, res){
    res.pushError("wieder ein test fehler")
        .pushError("chaining")
        .pushInfo("und eine info")
        .pushSuccess("und ein großer Erfolg")
        .pushSuccess("supidubi")
        .render('home', {
            title: 'Home',
            message: 'dies ist ein test'
        });
});

module.exports = router;
