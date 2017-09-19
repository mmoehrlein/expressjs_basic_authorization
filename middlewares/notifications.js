module.exports = function(req, res, next){
    res.locals.notifications = {
        errors: [],
        warnings: [],
        successes: [],
        infos: []
    };
    console.log("notifications");
    next()
};