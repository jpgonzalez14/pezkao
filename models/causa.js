'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CausaSchema = Schema({
  tipo: String,
  description: String,
  pez: { type: Schema.ObjectId, ref: 'Pez' }
});

module.exports = mongoose.model('Causa', CausaSchema);
