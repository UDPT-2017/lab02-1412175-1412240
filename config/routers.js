var controllers = require('../app/controllers');
var getListFriends = require('../app/helpers/getListFriends');
var sendMessage = require('../app/helpers/sendMessage');
var addFriend = require('../app/helpers/addFriend');
var removeFriend = require('../app/helpers/removeFriend');
var pool = require('../app/models/db');

var users = {}; //Array users are connecting to server

module.exports = function(app,session,passport,io){

  /*
  		client event starts
  	*/
    io.on('connection', function(client) {
      client.on('useronline', function(data) {
              var user ={
                id: client.id,
                ava: ''
              }
              pool.query("select ava from users where username = $1",[data],function(err,d){
                if(d.rows.length){
                  user.ava = d.rows[0].ava;
                  users[data] = user;
                }
              })
        });
        client.on('send-msg',function(data){
          sendMessage(data,function(r){
            if(r){
              if(users[data.to_user]){
                io.to(users[data.to_user].id).emit('hihi',data);
                io.to(users[data.to_user].id).emit('refreshHome',{data: data, ava: users[data.to_user].ava});
              }
            }
             var response = {check: r,data: data};
              client.emit('res-send',response);
          })
        });

        client.on('addfriend',function(data){
          addFriend(data,function(r){
              console.log(r);
            if(r){
              if(users[data.friend]){
                io.to(users[data.friend].id).emit('reqFriend',{data: data, ava: users[data.friend].ava});
              }
            }
             var response = {check: r,data: data};
              client.emit('res-addfriend',response);
          })
        });
        client.on('unfriend',function(data){
          removeFriend(data,function(r){
              console.log(r);
            if(r){
              if(users[data.friend]){
                io.to(users[data.friend].id).emit('reqUnFriend',{data: data, ava: users[data.friend].ava});
              }
            }
             var response = {check: r,data: data};
              client.emit('res-unfriend',response);
          })
        });
  });
  	/*
  		client event Ends
  	*/

  app.get('/', controllers.HomeController);

  app.get('/login-success', controllers.HomeController_copy);
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


  app.get('/messages', controllers.MessageController);

  app.get('/messages/:id',controllers.ChatController);

  app.get('/about', function(req, res){
    res.render('about', {user: req.user, about: "active"});
  });

};
