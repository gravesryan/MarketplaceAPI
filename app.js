var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');

var http = require('http');
var fs = require('fs');
var url = require('url');

var index = require('./routes/index');
var users = require('./routes/user_routes');
var items = require('./routes/item_routes');
var inbox = require('./routes/inbox_routes');
var pictures = require('./routes/pictures_routes');
var sales = require('./routes/sale_routes');
var tags = require('./routes/tags_routes');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);
app.use('/users', users);
app.use('/items', items);
app.use('/inbox', inbox);
app.use('/pictures', pictures);
app.use('/sales', sales);
app.use('/tags', tags);

var dir = path.join(__dirname, 'public/images');


var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './public/images');
    },
    filename: function(req, file, callback) {
        callback(null, req.query.item_id + '-' + req.query.img_num + '.png');
    }
});

var upload = multer({
    storage: Storage
}).single('picture');

app.get("/pics/download", function (req, res) {

})

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/pics", function(req, res) {
    var file = path.join(dir, req.query.item_id + '-' + req.query.img_num + '.png');
    console.log(file);
    var s = fs.createReadStream(file);
    s.on('open', function() {
        res.set('Content-Type', 'image/png');
        s.pipe(res);
    });
});

app.post("/pics/upload", function(req, res) {
  console.log("tried");
    upload(req, res, function(err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        return res.end("File uploaded successfully!");
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
