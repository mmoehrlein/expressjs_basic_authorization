generator = {};

generator.builder = function(tag, message, err, code){
    response = {
        time: new Date()
    };
    if(err){
        response.status = code;
        response.msg = err.message;
    } else {
        response.status = 200;
        response[tag] = message;
    }

    return response;
};

generator.errorResponse = function(err, code){
    return this.builder(null, null, err, code);
};

generator.response = function(tag, items){
    return this.builder(tag, items, null);
};


module.exports = generator;