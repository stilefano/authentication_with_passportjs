
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , everyauth = require('everyauth')
  , main = require('./main');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('host',process.env.HOST || '127.0.0.1')
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser('that\'s a secret'));
  app.use(express.session());
  app.use(everyauth.middleware());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

app.get('/registration', main.registration);

app.post('/registration',main.authenticate);

http.createServer(app).listen(app.get('port'), function(){
  console.log("listin on port " + "http://" + app.get('host') + ":" + app.get('port'));
});
