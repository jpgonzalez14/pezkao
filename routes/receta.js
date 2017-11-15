//'use strict'

var express = require('express');
var RecetaController = require('../controllers/receta');
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');

//images miltipart es para subir archivos
var md_upload = multipart({uploadDir: './uploads/images'});
var api = express.Router();

api.get('/prueba-controlador-receta', md_auth.ensureAuth, RecetaController.pruebas);

module.exports = api;
