var db = require('../helpers/dbHelper');
var bcrypt = require('bcrypt');

exports.create = function(username, email, password, callback){

    bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS), function(err, hash){
        if(err){
            return callback(err);
        }
        var user = {
            username: username,
            email: email,
            password: hash
        };
        //console.log(hash);

        db.query('INSERT INTO users SET ?', user, function(err, result){
            if(err){
                return callback(err);
            } else {
                return callback(null, result.insertId);
            }
        });
    })
};

exports.get = function(id, callback){
    db.query('SELECT * FROM users WHERE id = ?', id, function(err, results){
        if(err){
            return callback(err);
        }
        callback(null, results[0]);
    });
};

exports.authenticate = function(username, password, callback){
    db.query('SELECT * FROM users WHERE username = ?', username, function(err, results){
        if(err){
            return callback(err);
        }
        if(results.length === 0){
            return callback(new Error("Benutzername oder Passwort falsch"));
        }

        var user = results[0];

        bcrypt.compare(password, user.password.toString(), function(err, success) {
            if(err){
                return callback(err)
            }
            if(success){
                return callback(null, user);
            } else {
                return callback(new Error("Benutzername oder Passwort falsch"));
            }
        });
    });
};

/*
exports.changePassword = function(id, password, callback){
    db.update({id: id}, {password: hash(password)}, function(err, affected){
        if(err){
            return callback(err);
        }
        callback(null, affected > 0);
    });
};*/
