var  pool = require('../models/db');
var getListFriends = require('./getListFriends');

var sendMessage =  function(pr,callback){
    getListFriends(pr.from_user,function(data){
      if(data.length){
        data.forEach(function(e){
          if(e.name_friend == pr.to_user){
            var query = "select * from conversation where (user_one = $1 and user_two = $2) or (user_one = $2 and user_two = $1)";
            pool.query(query,[pr.from_user,pr.to_user],function(err,result){
              if (err) {
                console.log(err);
              }
              else {
                if(result.rows.length){
                  var cquery = "select add_conrep($1,$2,$3,$4,$5,$6)";
                  pool.query(cquery,[pr.text,pr.send_time,false,'',result.rows[0].c_id,pr.from_user],function(err,r){
                    if(r.rows.length){
                      callback(true);
                      return;
                    }else {
                      callback(false);
                      return;
                    }
                  })
                }
                else {
                  callback(false);
                  return;
                }
              }
            })
          }
        })
      }else{
        callback(false);
        return;
      }
    })
};
 module.exports = sendMessage;
