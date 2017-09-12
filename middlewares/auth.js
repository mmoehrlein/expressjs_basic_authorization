var token = require('../models/token');
module.exports = function(req, res, next){
    if(req.token){

    } else {
        res.status(401)
           .end();
    }
};