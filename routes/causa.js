//'use strict'

var express = require('express');
var CausaController = require('../controllers/causa');
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');

//images miltipart es para subir archivos
var md_upload = multipart({uploadDir: './uploads/images'});
var api = express.Router();

api.get('/prueba-controlador-causa', md_auth.ensureAuth, CausaController.pruebas);
api.get('/causa-pez/:idPez', md_auth.ensureAuth, CausaController.getCausasPez);
api.put('/update-causa/:id', md_auth.ensureAuth, CausaController.updateCausa);
api.post('/crear-causa', md_auth.ensureAuth, CausaController.saveCausa);
api.delete('/delete-causa/:id', md_auth.ensureAuth, CausaController.deleteCausa);

module.exports = api;
