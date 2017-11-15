//'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
  username: { type:String, required:true },
  email: { type:String, required:true },
  password: { type:String, required:true },
  role: String
});

module.exports = mongoose.model('User', UserSchema);
