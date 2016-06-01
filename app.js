var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//配置首页路由
var routes = require('./routes/index');
//配置用户路由
var users = require('./routes/users');
var article = require('./routes/article');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
//设置html的模板由ejs引擎来进行渲染
app.engine('html',require('ejs').__express);

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret:'jx',
  resave:true,
  saveUninitialized:true,
  store:new MongoStore({// 指定会话的数据库存储位置
          url:'mongodb://localhost:27017/jinziblog'
 })
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(function (req,res,next) {
  res.locals.user=req.session.user;
  res.locals.success=req.flash('success').toString();
  res.locals.error=req.flash('error').toString();
  next();
  // //res.locals它是模板渲染时真正用的数据源对象
  // res.locals.user = req.session.user;
  // //一旦取值之后会把flash中存放的值删除掉
  // res.locals.success = req.flash('success').toString();
  // res.locals.error = req.flash('error').toString();
  // next();
});

app.use('/', routes);

app.use('/users', users);
app.use('/article', article);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
