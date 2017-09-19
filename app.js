var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');

// loading environment variables
require('dotenv')
    .config();

// setup view engine
app.set('view engine', 'pug');

// using middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(require('./middlewares/ensureTokenMiddleware'));
app.use(require('./middlewares/notificationsMiddleware'));

// serving static content
app.use(express.static(__dirname + '/public'));

// routing
app.use(require('./controllers'));

// catch 404 and forward to error handler
app.use(require('./middlewares/404HandlerMiddleware'));

// error handler
app.use(require('./middlewares/errorPageMiddleware'));

app.listen(3000, function(){
    console.log('Listening on port 3000...');
});
