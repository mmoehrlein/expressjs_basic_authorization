var jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

exports.verify = function(token, callback){
    jwt.verify(token, secret, callback);
};

exports.sign = function(data, callback){
    jwt.sign(data, secret, {}, callback);
};

exports.generate = function(user, callback){
    var data = {
        user: {
            username: user.username
        },
        permissions: JSON.parse(user.permissions)
    };
    return callback(null, data);
};