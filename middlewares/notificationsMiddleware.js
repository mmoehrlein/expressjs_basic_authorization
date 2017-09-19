module.exports = function(req, res, next){
    res.locals.notifications = {
        errors: [],
        warnings: [],
        successes: [],
        infos: []
    };
    res.pushSuccess = function(msg){
        this.locals.notifications.successes.push(msg);
        return this;
    };
    res.pushError = function(msg){
        this.locals.notifications.errors.push(msg);
        return this;
    };
    res.pushWarning = function(msg){
        this.locals.notifications.warnings.push(msg);
        return this;
    };
    res.pushInfo = function(msg){
        this.locals.notifications.infos.push(msg);
        return this;
    };
    next()
};
