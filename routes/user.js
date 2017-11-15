//'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');

//images miltipart es para subir archivos
var md_upload = multipart({uploadDir: './uploads/images'});
var api = express.Router();

api.get('/admins', UserController.getKeepers);
api.get('/pruebaControlador', md_auth.ensureAuth, UserController.pruebas);
api.put('/update/:id', md_auth.ensureAuth, UserController.updateUser);
api.post('/registrar', UserController.saveUser);
api.post('/login', UserController.login);

module.exports = api;
