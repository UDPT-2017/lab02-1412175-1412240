var  pool = require('../models/db');
var getListFriends = require('../helpers/getListFriends');
var UsersController = function(req,res){
  if(req.user){
    var listusers =[];
    getListFriends(req.user.username,function(data){
      pool.query("select * from users",function(err,result){
         if(err){
           console.error(err);
         }else{
           result.rows.forEach(function(row){
             if( row.username!=req.user.username){
               if (!(data.filter(e => e.name_friend == row.username).length)) {
                 listusers.push({
                   user_id: row.user_id,
                   username: row.username,
                   password: row.password,
                   email: row.email,
                   phonenumber: row.phonenumber,
                   ava: row.ava,
                   unf: true,
                 });
               }else {
                 listusers.push({
                   user_id: row.user_id,
                   username: row.username,
                   password: row.password,
                   email: row.email,
                   phonenumber: row.phonenumber,
                   ava: row.ava,
                   unf: false,
                 });
               }
             }
           });
           console.log(listusers);
           res.render('users', {user: req.user, users: "active", listusers: listusers});
         }
      });
    })
  }
  else {
    res.redirect('/');
  }
}
module.exports = UsersController;
