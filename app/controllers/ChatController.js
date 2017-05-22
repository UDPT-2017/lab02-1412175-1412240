var  pool = require('../models/db');
var getListMessages = require('../helpers/getListMessages');

var ChatController = function(req,res){
  if(req.user){

    getListMessages(req.user.username,req.params.id,function(listMessages){
            //update last message is seen
            if (listMessages.length) {
              if(listMessages[listMessages.length-1].from_user != req.user.username){
                var update = "update conversation_reply set seen = $1, seeingtime = $2 where cr_id = $3";
                var now = new Date().getTime();
                var cr_id = listMessages[listMessages.length-1].cr_id;
                pool.query(update,[true,now,cr_id],function(err,rt){
                      res.render('messages', {user: req.user, messages: "active",listMessages: listMessages, friend: req.params.id});
                })}else{
                    res.render('messages', {user: req.user, messages: "active",listMessages: listMessages, friend: req.params.id});
                }
            }else {
                res.render('messages', {user: req.user, messages: "active",listMessages: listMessages, friend: req.params.id});
            }
    })
  }
  else {
    res.redirect('/');
  }
};

module.exports = ChatController;
