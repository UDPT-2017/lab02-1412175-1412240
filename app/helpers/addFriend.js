var  pool = require('../models/db');

var addFriend = function(data,callback){
   var query = "select add_con($1,$2)";
   pool.query(query,[data.user,data.friend],function(err,result){
     if(result.rows.length){
       callback(true);
       return;
     }
     else {
       callback(false);
     }
   })
}

module.exports = addFriend;
