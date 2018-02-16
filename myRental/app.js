let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let session = require('express-session');
let RedisStore = require('connect-redis')(session);

let userController = require('./routes/userController');
let Logger = require('./modules/Log.js');
let config = require('./config.json');

let app = express();
let logger = new Logger();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

process.env.DEBUG = true;

let redisStore = new RedisStore(config.redis.store_data);
let sessionData = config.redis.redis_argument;
sessionData.store = redisStore;

app.use(session (sessionData));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../TerraWeb/build')));

app.use('/users', userController);
app.use((error, request, response, next) => {
    response.locals.message = error.message;
    response.locals.error = request.app.get('env') === 'development' ? error : {};
    response.status(error.status || 500);
    if(error) {
        logger.log(error);
    }
    response.render('error');
});

app.get('*', (req, res,next) => {
    res.sendFile(path.join(__dirname, '../../TerraWeb/build') +
    '/index.html');
});

module.exports = app;
