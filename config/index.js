
module.exports = function(app){


  require('./middleware')(app);
  require('./routers')(app);
  require('./views')(app);
};
