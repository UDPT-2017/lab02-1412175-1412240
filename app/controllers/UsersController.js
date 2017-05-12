var  pool = require('../models/db');
var UsersController = function(req,res){
    var listusers =[];
   pool.query("select * from users",function(err,result){
      if(err){
        console.error(err);
      }else{
        result.rows.forEach(function(row){
          listusers.push({
            user_id: row.user_id,
            username: row.username,
            password: row.password,
            email: row.email,
            phonenumber: row.phonenumber,
            ava: row.ava
          });
        });
        res.render('users', {user: req.user, users: "active", listusers: listusers});
      }
   });
}
module.exports = UsersController;
