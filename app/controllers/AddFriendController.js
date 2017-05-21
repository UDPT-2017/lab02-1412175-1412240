var  pool = require('../models/db');

var AddFriendController = function(req,res){
   var query = "select add_con($1,$2)";
   pool.query(query,[req.user.username,req.query.friend],function(err,result){
     if(result.rows.length){
       res.send(true);
     }
   })
}

module.exports = AddFriendController;
