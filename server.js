var express = require('express');
var app = express();
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var path = require('path');

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
app.use(require('./middlewares/notificationsMiddleware'));
app.use(require('./middlewares/ensureTokenMiddleware'));
//app.use(require('./middlewares/authMiddleware'));

// serving static content
app.use(express.static(__dirname + '/public'));

// routing for api
app.use('/api', require('./controllers'));

app.get('/', function(req, res){
    res.json({heyy:'you'});
});

/*app.get('*', function(req, res){
    return res.sendFile(path.join(__dirname, 'mmoehrlein-app/dist/index.html'));
});*/

// catch 404 and forward to error handler
app.use(require('./middlewares/404HandlerMiddleware'));

// error handler
app.use(require('./middlewares/errorPageMiddleware'));


var port = process.env.PORT || 3000;
app.set('port', port);
var server = http.createServer(app);
server.listen(port, function(){
    console.log('Listening on port ' + port + '...');
});
