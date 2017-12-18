var Token = require('../models/tokenModel');

module.exports = function(req, res, next){
    const bearerHeader = req.headers["authorization"];
    const bearerCookie = req.cookies.jwt;
    var token = null;
    if(typeof bearerHeader !== 'undefined'){
        token = bearerHeader.split(" ")[1];
    } else if(bearerCookie !== undefined){
        token = bearerCookie.split(" ")[1];
    } else {
        console.log("no token found");
        req.authenticated = false;
        res.locals.authenticated = false;
        delete req.user;
        return next();
    }

    if(token !== null){
        Token.verify(bearerCookie.split(" ")[1], function(err, data){
            if(err){
                console.log(err.message);
                //res.pushError("Token could not be verified. Please login again");
                console.log("Token could not be verified. Please login again");
                res.clearCookie('jwt');
                res.locals.authenticated = false;
                req.authenticated = false;
                delete req.user;
                return next();
            }
            req.authenticated = true;
            res.locals.authenticated = true;
            req.user = data;
            return next();
        });
    }
};
