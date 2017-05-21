var  pool = require('../models/db');
var getListFriends = require('../helpers/getListFriends');

var SMController =  function(req,res){
  if(req.user){
    getListFriends(req.user.username,function(data){
      if(data.length){
        data.forEach(function(e){
          if(e.name_friend == req.params.id){
            var query = "select * from conversation where (user_one = $1 and user_two = $2) or (user_one = $2 and user_two = $1)";
            pool.query(query,[req.user.username,req.params.id],function(err,result){
              if (err) {
                console.log(err);
              }
              else {
                if(result.rows.length){
                  var cquery = "select add_conrep($1,$2,$3,$4,$5,$6)";
                  pool.query(cquery,[req.body.text,req.body.send_time,false,'',result.rows[0].c_id,req.user.username],function(err,r){
                    if(r.rows.length){
                      res.send(true);
                    }else {
                      res.send(false);
                    }
                  })
                }
                else {
                  req.session.error = "Could not send to user. Please try again.";
                }
              }
            })
          }else{
            res.send(false);
          }
        })
      }else{
        res.send(false);
      }
    })
  }
  else {
    res.redirect('/');
  }

};
 module.exports = SMController;
