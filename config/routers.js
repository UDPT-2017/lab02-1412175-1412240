var UsersController = require('../app/controllers/UsersController');

module.exports = function(app,session,passport){
  app.get('/', function(req, res){
    res.render('home', {user: req.user, home: "active"});
  });

//displays our signup page
app.get('/signin', function(req, res){
  res.render('signin');
});

//sends the request through our local signup strategy, and if successful takes user to homepage, otherwise returns then to signin page
app.post('/local-reg', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signin'
  })
);

//sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
app.post('/login', passport.authenticate('local-signin', {
  successRedirect: '/',
  failureRedirect: '/'
  })
);

//logs user out of site, deleting them from the session, and returns to homepage
app.get('/logout', function(req, res){
  var name = req.user.username;
  req.logout();
  res.redirect('/');
  req.session.notice = "You have successfully been logged out " + name + "!";
  });


  app.get('/users', UsersController);

  app.get('/messages', function(req, res){
    res.render('messages', {user: req.user, messages: "active"});
  });

  app.get('/about', function(req, res){
    res.render('about', {user: req.user, about: "active"});
  });

};
