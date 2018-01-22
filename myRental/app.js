let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let userController = require('./routes/userController');

let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../MyRentalWeb/build')));

app.use('/users', userController);

app.use((error, request, response, next) => {
    response.locals.message = error.message;
    response.locals.error = request.app.get('env') === 'development' ? error : {};
    response.status(error.status || 500);
    response.render('error');
});

app.get('*', (req, res,next) => {
    res.sendFile(path.join(__dirname, '../../MyRentalWeb/build') +
    '/index.html');
});

module.exports = app;
