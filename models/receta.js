'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecetaSchema = Schema({
  nombre: String,
  tiempo: Number,
  description: String,
  autor: String,
  porciones: Number,
  image: String,
  ingredientes:[{ porcion:String, ingrediente:String }],
  pasos:[{ titulo:String, descripcion:String }],
  pez: { type: Schema.ObjectId, ref: 'Pez' }
});

module.exports = mongoose.model('Receta', RecetaSchema);
