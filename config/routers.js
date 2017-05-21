var controllers = require('../app/controllers');
module.exports = function(app,session,passport){

  /*
  		Socket event starts
  	*/

  	/*
  		Socket event Ends
  	*/


  app.get('/', controllers.HomeController);

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


  app.get('/users', controllers.UsersController);

  app.get('/users/addfriend', controllers.AddFriendController);
  app.get('/users/removefriend', controllers.RemoveFriendController);

  app.get('/messages', controllers.MessageController);

  app.get('/messages/:id',controllers.ChatController);
  app.post('/messages/:id/send',controllers.SMController);
  app.get('/messages/:id/send',controllers.GetSMController);

  app.get('/about', function(req, res){
    res.render('about', {user: req.user, about: "active"});
  });

};
