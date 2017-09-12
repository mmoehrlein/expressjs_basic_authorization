module.exports = function(req, res, next){
    var token = require('../models/token');
    const bearerHeader = req.headers["authorization"];
    const bearerCookie = req.cookies.jwt;

    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        token.verify(bearer[1], function(err, decoded){
            if(error){
                res.status(401).render('error');
            } else {
                req.user = decoded.user;
                req.permissions = decoded.permissions;
            }
        });
    } else if(bearerCookie !== undefined){
        console.log("cookie");
        console.log(bearerCookie);
    } else {
        console.log("no token found");
        delete req.permissions;
        delete req.user;
    }
    next();
};