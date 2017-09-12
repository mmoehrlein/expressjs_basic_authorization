var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// loading environment variables
require('dotenv')
    .config();

// setup view engine
app.set('view engine', 'pug');

// using middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('./middlewares/ensureToken'));

// serving static content
app.use(express.static(__dirname + '/public'));

// routing
app.use(require('./controllers'));

// catch 404 and forward to error handler
app.use(function(req, res, next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next){
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(3000, function(){
    console.log('Listening on port 3000...');
});