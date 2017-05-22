var  pool = require('../models/db');
var getListFriends = require('./getListFriends');

//remove a friend in list friends of user
var removeFriend = function(tem,callback){
  getListFriends(tem.user,function(data){
      data.forEach(function(e){
        if(e.name_friend == tem.friend){//check friend  exists in list friends of user
          //delete all message in conversation_reply if con_id = c_id
          var query = "delete from conversation_reply where con_id = $1";
          pool.query(query,[e.c_id],function(err,result){
            if(err){
                callback(false);
            }else{
              //delete conversation between user and friend
              var cquery = "delete from conversation where c_id = $1";
              pool.query(cquery,[e.c_id],function(err,result){
                if(err){
                  callback(false);
                }else{
                   callback(true);
                }
              })
            }
          })
        }
      })
    });
}

module.exports = removeFriend;
