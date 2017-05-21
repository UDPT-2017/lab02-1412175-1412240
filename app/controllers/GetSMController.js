var  pool = require('../models/db');
var getListMessages = require('../helpers/getListMessages');

var GetSMController =  function(req,res){
  if(req.user){
    getListMessages(req.user.username,req.params.id,function(listMessages){
      res.send(listMessages);
    })
  }
  else {
    res.redirect('/');
  }
}

module.exports = GetSMController;
