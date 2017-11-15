//'use strict'

var express = require('express');
var PezController = require('../controllers/pez');
var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');
var multipart = require('connect-multiparty');

//images miltipart es para subir archivos
var md_upload = multipart({uploadDir: './uploads/images'});
var api = express.Router();

api.get('/peces', PezController.getPezkaos);
api.get('/pruebas-pez', md_auth.ensureAuth, PezController.pruebas);
api.get('/pez/:id', PezController.getPezkao);
api.get('/get-image-file-pez/:imageFile', PezController.getImageFile);
api.post('/create-pez', [md_auth.ensureAuth, md_admin.isAdmin], PezController.savePez);
api.put('/update-pez/:id', [md_auth.ensureAuth, md_admin.isAdmin], PezController.updatePez);
api.post('/upload-pez-image/:id', [md_auth.ensureAuth, md_admin.isAdmin, md_upload], PezController.uploadImage);
api.delete('/pez/:id', [md_auth.ensureAuth, md_admin.isAdmin], PezController.deletePez);


module.exports = api;
