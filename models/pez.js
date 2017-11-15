'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PezSchema = Schema({
  name: String,
  description: String,
  category: String,
  deMar: Boolean,
  image: String,
  user: { type: Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Pez', PezSchema);
