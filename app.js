var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
const fileUpload = require('express-fileupload');

var app = express();

var config = require('./config')

const { indexPage } = require('./routes/index');
const { addRecipePage, addRecipe } = require('./routes/addItem');
const { getAnimalPage, animalRecipePage } = require('./routes/recipes');

var conn = mysql.createConnection(config.mysql);
conn.connect(function (err) {
    if (!err) {
        console.log("Database is connected.");
    } else {
        console.error(err);
        console.log("Error connecting Database.");
    }
});
global.conn = conn;

app.set('port', process.env.port || config.port)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', indexPage);

app.get('/recipes/:animal', getAnimalPage)
app.get('/recipes/:animal/:id', animalRecipePage)

app.get('/addItem', addRecipePage);
app.post('/uploadItem', addRecipe);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render(err);
});

module.exports = app;
