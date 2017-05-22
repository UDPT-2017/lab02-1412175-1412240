var  pool = require('../models/db');


var getListFriends = function(user,callback){
    var listFriends = [];
    var query = "select * from conversation where user_one = $1 or user_two = $1";
      pool.query(query,[user],function(err,result){
        if(err){
          console.error(err);
        }else{

            (function iterator(i) {
              var fr = {};
              if (i == result.rows.length) {
                  callback(listFriends);
                  return;
              }
              else {
                var friend = result.rows[i].user_one == user ? result.rows[i].user_two : result.rows[i].user_one;
                fr.c_id = result.rows[i].c_id;//get c_id
                pool.query("select ava from users where username = $1",[friend],function(err,re){
                  if(err){
                    console.error(err);
                  }else{
                    fr.ava_friend = re.rows[0].ava;
                    fr.name_friend = friend;
                  }
                  listFriends.push(fr);
                  iterator(i + 1);
                })
            }
          })(0);
        }
      })
}

module.exports = getListFriends;
