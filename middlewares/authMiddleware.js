var resGen = require('../helpers/responseGenerator');

function auth(roles){
    return function(req, res, next){
        console.log(roles);
        if(!req.authenticated){
            //res.pushWarning('Please log in to use this site');

             return res.status(401).json(resGen.errorResponse(new Error("Please log in to use this site"), 401));
        } else if(typeof roles !== 'undefined'){
            for(var role in roles){
                console.log(role);
                if(req.user.permissions.roles.indexOf(roles[role]) > -1){
                    console.log("auth mit role check");
                    return next();
                }
            }

            console.log('no permission');
            return res.status(401).json(resGen.errorResponse(new Error("You dont have Permission"), 401));

        } else {
            console.log("auth ohne role check");
            return next();
        }

    };
}

module.exports = auth;
/*
module.exports = function(req, res, next){
    req.auth = function(roles){
        console.log(roles);
        if(!this.authenticated){
            //res.pushWarning('Please log in to use this site');
            res.json(resGen.errorResponse(new Error("Please log in to use this site", 401)));
            res.redirect('/users/login');
            return false;
        } else if(typeof roles !== 'undefined'){
            for(var role in roles){
                console.log(role);
                if(this.user.permissions.roles.indexOf(roles[role]) > -1){
                    return true;
                }
            }
            console.log('no permission');
            res.pushWarning('You are not permitted to do that');
            res.saveNotifiactions();
            res.redirect('back');
            return false;
        } else {
            return true;
        }
    };
    next();
};
*/
