module.exports = function(req, res, next){
    const bearerHeader = req.headers["authorization"];
    const bearerCookie = req.cookies.jwt;

    if(typeof bearerHeader !== 'undefined'){
        const token = bearerHeader.split(" ")[1];
        req.token = token;

    } else if(bearerCookie !== undefined){
        console.log("cookie");
        console.log(bearerCookie);
    } else {
        console.log("no token found");
        delete req.permissions;
        delete req.user;
    }
    next();
};
