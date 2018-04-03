var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var router = require('./routes/router.js');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var customfilters = require('./common/filters');
var helper = require('./common/helper');
var tdk_monitor = require('./tdk/tdk_monitor');
var app = express();
// 代码片段
var esinc = require('./middleware/esitag')(nunjucks);
var midesi = require('./middleware/midesi');
var config = require('./config/config');
var viewcache = require('./middleware/viewcache');
var url_rewrite = require("./middleware/url_decode");
var esihelper = require('./middleware/esihelper');

app.use(favicon(path.join(__dirname, 'favicon.ico')));
// view engine setup
var viewspath = 'views';
if(process.env.NODE_ENV == 'production'){
  viewspath = 'dist/views'
}

app.set('views', path.join(__dirname, viewspath));
var env = nunjucks.configure(viewspath, {
  autoescape: true
});
//add esinc
env.addExtension('esinc', new esinc());
app.use(midesi({
  fragserver: 'http://127.0.0.1',
  port:'3500'
}));

url_rewrite(app);

app.set('view engine', 'html');
customfilters.load(env);
app.locals.helper = helper;
env.express(app);
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false,limit:"2048kb" }));
// app.use(cookieParser());
app.use(cookieParser('Asecretqqqq-'));

//seesion
app.use(session({
    secret:'Asecretqqqq-',
    store: new RedisStore({
        host: '192.168.122.110',
        port:6379
    }),
    resave: false,
    saveUninitialized:true
}));

if(process.env.NODE_ENV == 'development'){
  app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
  app.use('/dep', express.static(path.join(__dirname, 'public/dep')));
    app.use('/views', express.static(path.join(__dirname, 'views')));
}else if(process.env.NODE_ENV == 'production'){
  app.use('/assets', express.static(path.join(__dirname, 'dist/public/assets')));
  app.use('/dep', express.static(path.join(__dirname, 'dist/public/dep')));
}

/*开发环境 ajax允许跨域*/
if (config.version == 'development') {
    app.all('*', function(req, res, next) {
        console.log('allow origin');
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });
}
app.all('*', function(req, res, next) {
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else next();
});
router(app);
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
    var data = [];
    data.esikey = esihelper.esikey();
    data.tdk = {
        pagekey: 'ERROR'
    };
    res.render('error',data);
});

module.exports = app;
