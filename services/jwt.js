//'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'elmotienediarrea';

exports.createToke = function(user){
  var payload = {
    sub: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    iat: moment().unix(),
    exp: moment().add(1, 'days').unix
  };
  return jwt.encode(payload, secret);
};
