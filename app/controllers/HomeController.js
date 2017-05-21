var  pool = require('../models/db');
var getListFriends = require('../helpers/getListFriends');

var HomeController = function(req, res){
  if (req.user) {
    var listMessages =[];
    var listFriends = [];
    getListFriends(req.user.username,function(data){
      //console.log(data);
        (function iterator(i) {
          if (i == data.length) {
            console.log(listMessages);
            listMessages.sort((a, b) => Number(b.cr_id) - Number(a.cr_id)); //sort list messages descends
            res.render('home', {user: req.user, home: "active", listMessages: listMessages, listFriends: listFriends});
                return;
          }
          var cquery = "select * from conversation_reply R where con_id = $1 ORDER BY R.cr_id DESC LIMIT 1";
          pool.query(cquery,[data[i].c_id],function(err,rst){
            var con_rep={};
            //if conversation_reply is empty
            if(rst.rows.length==0){
              con_rep.cr_id = '',
              con_rep.text = '',
              con_rep.friend = data[i].name_friend,
              con_rep.from_user =data[i].name_friend,
              con_rep.seen = '';
              con_rep.ava_friend = data[i].ava_friend;
            }
            else {
              //add from_user to object con_rep
              //struct of con_rep = {ava_friend, from_user, text, seen)}
                con_rep.cr_id = rst.rows[0].cr_id;
                con_rep.text = rst.rows[0].text.length >50 ?  rst.rows[0].text.slice(0, 50) + ' ...' : rst.rows[0].text,
                con_rep.friend = data[i].name_friend;
                con_rep.from_user = rst.rows[0].from_user == data[i].name_friend ? data[i].name_friend : 'ME';
                con_rep.seen = rst.rows[0].seen == false ? 'active' : '';
                con_rep.ava_friend = data[i].ava_friend;

                }
                listMessages.push(con_rep);
                listFriends.push(data[i]);
                iterator(i + 1);
              })
          })(0);
    })
  }
  else {
     res.render('home', {user: req.user});
  }
};

module.exports = HomeController;
