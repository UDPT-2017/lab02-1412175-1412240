var  pool = require('../models/db');
var getListFriends = require('../helpers/getListFriends');

//remove a friend in list friends of user
var RemoveFriendController = function(req,res){
  getListFriends(req.user.username,function(data){
      data.forEach(function(e){
        if(e.name_friend == req.query.friend){//check friend  exists in list friends of user
          //delete all message in conversation_reply if con_id = c_id
          var query = "delete from conversation_reply where con_id = $1";
          pool.query(query,[e.c_id],function(err,result){
            if(err){
              console.log(err);
            }else{
              //delete conversation between user and friend
              var cquery = "delete from conversation where c_id = $1";
              pool.query(cquery,[e.c_id],function(err,result){
                if(err){
                  console.log(err);
                }else{
                   res.send(true);
                }
              })
            }
          })
        }
      })
    });
}

module.exports = RemoveFriendController;
