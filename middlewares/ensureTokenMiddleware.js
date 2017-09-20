module.exports = function(req, res, next){
    const bearerHeader = req.headers["authorization"];
    const bearerCookie = req.cookies.jwt;

    if(typeof bearerHeader !== 'undefined'){
        req.token = bearerHeader.split(" ")[1];

    } else if(bearerCookie !== undefined){
        console.log("cookie");
        console.log(bearerCookie);
        req.token = bearerCookie.split(" ")[1];
    } else {
        console.log("no token found");
        delete req.permissions;
        delete req.user;
    }
    next();
};
