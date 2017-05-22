var getListFriends = require('../helpers/getListFriends');

var MessageController = function(req, res){
  if(req.user){
    getListFriends(req.user.username,function(data){
      var listFriends = data;
      res.render('messages',{user: req.user, messages: "active",listFriends: listFriends})
    })
  }
  else {
    res.redirect('/');
  }
}

module.exports = MessageController;
