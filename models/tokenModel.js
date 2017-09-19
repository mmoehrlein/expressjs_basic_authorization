var jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

exports.verify = function(token, callback){
    jwt.verify(token, secret, callback);
};

exports.sign = function(data, callback){
    jwt.sign(data, secret, {}, callback);
};