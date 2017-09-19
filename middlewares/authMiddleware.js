var token = require('../models/tokenModel');
module.exports = function(req, res, next){
    if(req.token){

    } else {
        res.status(401)
           .end();
    }
};
