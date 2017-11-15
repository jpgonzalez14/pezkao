'use strict'

//modulos
var fs = require('fs');
var path = require('path');
//modelos
var Causa = require('../models/receta');
var Pez = require('../models/pez');

//acciones
function pruebas(req, res){
  res.status(200).send({
    message: 'provando controlador causa y accion pruebas',
    user: req.user
  });
}

module.exports = {
  pruebas
};
