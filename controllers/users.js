var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Token = require('../models/token');
var util = require('util');

// REGISTER
router.post('/register', function(req, res, next){
    var name = req.body.name;
    var password = req.body.password;
    var email = req.body.email;
    User.create(name, email, password, function(err, userid){
        if(err){
            next(err);
        }
        User.get(userid, function(err, user){
            if(err){
                next(err);
            }
            var data = {username: user.username, permissions: user.permissions};
            Token.sign(data, function(err, token){
                if(err){
                    next(err);
                }
                res.cookie('jwt', 'Bearer ' + token);
                //TODO register success page
                res.send('user created and logged in');
            });
        });
    });
});

router.get('/register', function(req, res){
    res.render('../views/users/register', {title : 'Register'});
});

// LOGIN
router.post('/login', function(req, res){
    res.send(req);
});

router.get('/login', function(req, res){
    res.render('../views/users/login', {title : 'Login'});
});

module.exports = router;