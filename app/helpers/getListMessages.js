var pool = require('../models/db');

var listMessages = function(user,friend,callback){
  var listMessages = [];
  var query = "select * from conversation where (user_one = $1 and user_two = $2) or (user_one = $2 and user_two = $1)";
  pool.query(query,[user,friend],function(err,result){
      var cquery = "select * from conversation_reply R where con_id = $1 ORDER BY R.cr_id";
        pool.query(cquery,[result.rows[0].c_id],function(err,rst){
          if(rst.rows.length){
            //push all messages into conversation
            var see_time ='';
            rst.rows.forEach(function(r){
              var sendtime = new Date(Number(r.sendingtime));
              var send_time = sendtime.toDateString() + ' ' +sendtime.toLocaleTimeString();
              if (r.cr_id ==rst.rows[rst.rows.length-1].cr_id) {
                if(rst.rows[rst.rows.length-1].seen && (rst.rows[rst.rows.length-1].from_user == user)){
                  var seetime = new Date(Number(r.seeingtime));
                  see_time = 'seen  '+seetime.toDateString() + ' ' +seetime.toLocaleTimeString();
                  }
                  listMessages.push({
                    'cr_id': r.cr_id,
                    'text': r.text,
                    'send_time': send_time,
                    'see_time': see_time,
                    'from_user': r.from_user,
                    'position': user == r.from_user ? 'right' : 'left',
                    'color': user == r.from_user ? '#1a75ff' : '#fff'
                  })
              }
              else listMessages.push({
                'cr_id': r.cr_id,
                'text': r.text,
                'send_time': send_time,
                'see_time': see_time,
                'from_user': r.from_user,
                'position': user == r.from_user ? 'right' : 'left',
                'color': user == r.from_user ? '#1a75ff' : '#fff'
              })
            })
              callback(listMessages);
          }else{
              callback(listMessages);
          }
        })
      })
}
module.exports = listMessages;
