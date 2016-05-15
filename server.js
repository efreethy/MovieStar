var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var database = require('./db/moviestarDB')();
var flash = require('connect-flash');
var session = require('express-session');
var configManager = require('./configFiles/configurationManager');
var GUESTS = require('./guests');
var port = process.env.PORT || 3000;

// make static content from the /public folder accessible
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// We will use the jade templates in ./views as a wrapper around the main angular app
app.set('views',__dirname+'/views');
app.set('view engine', 'jade');

var secret = configManager.expressSessionSecret();
// express session provides a simple way to perserve information across requests.
// Internally it uses a secret, provided by us, to associate requests to their sessions
app.use(session({
  secret: secret,
  resave: true,
  saveUninitialized: true
}));

// flash is a useful middleware that enables us to send messages through a single request,
// this is helpful for notifying the user when they need to log in, type their password, etc.
app.use(flash());

// Authorization middleware which will be used on protected routes
var authorize = function(req, res, next) {
  if (req.session && req.session.user) {
    next();
  }
  else {
    req.flash('loginMessage', 'Please log in here to use MovieStar');
    res.redirect(301,'/login');
  }
};

app.get('/', function (req,res) {
  res.render('index');
});

// protected route, request gets sent through authorize middleware
app.post('/favorites', authorize, function(req, res){
  var imdbID = req.body.imdbID;

  database.User.find({where: {username: req.session.user.username}}).then(function (user) {
    if (req.body.method == "create") {
      return database.MovieFavorite.create({ user_id: user.id, movie_id: imdbID });
    } else {
      return database.MovieFavorite.destroy({ where: { user_id: user.id, movie_id: imdbID } });
    }
  }).then(function () {
    //redirect back to favorites page after saving favorite
    res.redirect("/#/movies/" + imdbID);
  });
});

app.post('/login', function(req, res){
  var username = req.body.username,
      password = req.body.password;

  database.User.find({ where: { username: username, password: password } }).then(function (foundUser) {
    if (foundUser) {
      req.session.user = foundUser;
      // only the authenticated user is stored on the session, and will have the ability to favorite posts.
      res.redirect('/');
    } else {
      req.flash('loginMessage', 'Username/Password invalid');
      res.redirect(301,'/login');
    }
  });
});

app.get('/login', function(req, res){
  messages = req.flash('loginMessage');
  res.render('login', { messages: messages, guests: GUESTS });
});

app.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/login');
});

// get information on an authenticated user to display in navbar, include any favorited movies.
app.get('/sessionUser', function (req, res) {
  var user = database.User.find({
     where: { username: req.session.user.username },
     attributes: ['username'],
     include: [{ model: database.MovieFavorite }]
   }).then(function (user) {
     res.status(200).send(user);
  });
});

// lastly if no route is caught, send back a 404
app.use(function(req, res){
  res.sendStatus(404);
});

app.listen(port, function(){
  console.log("Listening on port 3000");
});
