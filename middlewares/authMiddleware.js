module.exports = function(req, res, next){
    req.auth = function(roles){
        console.log(roles);
        if(!this.authenticated){
            res.pushWarning('Please log in to use this site');
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
