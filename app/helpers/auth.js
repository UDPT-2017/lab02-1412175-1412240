var bcrypt = require('bcryptjs'),
    Q = require('q'),
    pool = require('../models/db'); //config file contains all tokens and other private info

//used in local-signup strategy
exports.localReg = function (username, password, email, phone) {
  var deferred = Q.defer();

    //check if username is already assigned in our database
    pool.query('select 1 from users where username = $1',[username],function(err, res) {
        if(err) {
            return console.error('error running query', err);
            deferred.resolve(false);
        }
        else if(res.rowCount){
          console.log(res);
          console.log("USERNAME ALREADY EXISTS:", username);
          deferred.resolve(false);
        }
        else{
          var hash = bcrypt.hashSync(password, 8);
          var user ={
            "username": username,
            "password": hash,
            "email": email,
            "phone": phone,
            "ava" : "/images/ava.png"
          }
          pool.query('select add_user($1, $2, $3, $4, $5)',
          [user.username,user.password,user.email,user.phone,user.ava],function(err, res) {
            if(err) {
                return console.error('error running query', err);
                deferred.resolve(false);
              }
            deferred.resolve(user);
          });
        }
      });
  return deferred.promise;
};

//check if user exists
    //if user exists check if passwords match (use bcrypt.compareSync(password, hash); // true where 'hash' is password in DB)
      //if password matches take into website
  //if user doesn't exist or password doesn't match tell them it failed
exports.localAuth = function (username, password) {
  var deferred = Q.defer();

  pool.query('select * from users where username = $1',[username],function(err, res) {
      if(err) {
          return console.error('error running query', err);
          deferred.resolve(false);
      }
      else if(!res.rowCount){
        console.log("USERNAME NOT FOUND:", username);
        deferred.resolve(false);
      }
      else {
        var hash = res.rows[0].password;

        console.log("FOUND USER: " + res.rows[0].username);
        if (bcrypt.compareSync(password, hash)) {
          var user ={
            "username": res.rows[0].username,
            "password": res.rows[0].password,
            "email": res.rows[0].email,
            "phone": res.rows[0].phone,
            "ava" : res.rows[0].ava
            }
            deferred.resolve(user);
        } else {
          console.log("AUTHENTICATION FAILED");
          deferred.resolve(false);
        }
      }
    });

  return deferred.promise;
}
