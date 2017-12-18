var express = require('express');
var router = express.Router();
var User = require('../models/userModel');
var Token = require('../models/tokenModel');
var util = require('util');
var resGen = require('../helpers/responseGenerator');


// REGISTER
router.post('/register', function(req, res, next){

    var name = req.body.name;
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;
    var email = req.body.email;

    User.create(name, email, password, function(err, userid){
        if(err){
            next(err);
        }
        User.get(userid, function(err, user){
            if(err){
                next(err);
            }
            var data = {
                user: {
                    username: user.username
                },
                permissions: user.permissions
            };

            Token.generate(user, function(err, data){
                //TODO token und cookie mit expiration date
                Token.sign(data, function(err, token){
                    if(err){
                        res.json(resGen.errorResponse(err));
                    }

                    res.cookie('jwt', 'Bearer ' + token);
                    //TODO register success page
                    res.json(resGen.response("token", token));
                });
            });
        });
    });
});

// LOGIN
router.post('/login', function(req, res, next){

    User.authenticate(req.body.username, req.body.password, function(err, user){
        if(err){
            return res.json(resGen.errorResponse(err));
        }

        //console.log(user);

        Token.generate(user, function(err, data){
            if(err){
                return next(err);
            }
            Token.sign(data, function(err, token){
                if(err){
                    return next(err);
                }

                res.locals.authenticated = true;
                res.cookie('jwt', 'Bearer ' + token);
                return res.json(resGen.response("token", token));

            });
        });
    });

});

/*router.get('/logout', function(req, res){
    res.locals.authenticated = false;
    res.clearCookie('jwt');
    res.pushSuccess("You have been logged out")
       .render('../views/home', {title: 'home'});
});*/

module.exports = router;
