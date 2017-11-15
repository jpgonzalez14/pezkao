'use strict'

//modulos
var fs = require('fs');
var path = require('path');
//modelos
var User = require('../models/user');
var Pez = require('../models/pez');

//acciones
function pruebas(req, res){
  res.status(200).send({
    message: 'provando controlador peces y accion pruebas',
    user: req.user
  });
}

function savePez(req, res){
  //instancia ususario
  var pez = new Pez();
  //params
  var params = req.body;
  //console.log(params);
  if(params.name && params.description && params.category && params.deMar){
    pez.name = params.name;
    pez.description = params.description;
    pez.category = params.category;
    pez.deMar = params.deMar;
    pez.image = params.image;
    pez.user = req.user.sub;

    pez.save((err, pezStored) => {
      if(err)
        res.status(500).send({message:'error al guardar pez'});
      else{
        if(!pezStored)
          res.status(404).send({message:'no se ha registrado el pez'});
        else{
          res.status(200).send({pez: pezStored});
        }
      }
    });
  }
  else{
    res.status(200).send({message:'ingrese los datos correctamente'});
  }

}

function getPezkaos(req, res){
  Pez.find({}).exec((err, pezkaos)=>{
    if(err){
      res.status(500).send({message:'Error en la peticion de los peces'});
    }else {
      if(!pezkaos)
        res.status(404).send({message:'no hay peces en el sistema'});
      else {
        res.status(200).send({pezkaos});
      }
    }
  });
}

function getPezkao(req, res){
  var pezId = req.params.id;
  Pez.findById(pezId).populate({path:'user'}).exec((err, pezkao)=>{
    if(err){
      res.status(500).send({message:'Error en la peticion del pez'});
    }else {
      if(!pezkao)
        res.status(404).send({message:'no existe'});
      else {
        res.status(200).send({pezkao});
      }
    }
  });;

}

function updatePez(req, res){
  var pezId = req.params.id;
  var update = req.body;
  //console.log(userId);
  //console.log(req.user.sub);
  Pez.findByIdAndUpdate(pezId, update, {new:true}, (err, pezUpdated) => {
    if(err)
      res.status(500).send({message:'error al actualizar pez'});
    else {
      if(!pezUpdated)
        res.status(404).send({message:'no se ha podido actualizar el pez'});
      else {
        res.status(200).send({pez: pezUpdated});
      }

    }
  });
  //res.status(200).send({message: 'actualizar usuario'});

}

function uploadImage(req, res){
  var pezId = req.params.id;
  var file_name = '... no subido ...';
  if(req.files){
    var file_path = req.files.image.path;
    var file_split = file_path.split('/');
    var file_name = file_split[2];

    var ext_split = file_name.split('\.');
    var file_ext = ext_split[1];

    if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){

      Pez.findByIdAndUpdate(pezId, {image: file_name}, {new:true}, (err, pezUpdated) => {
        if(err)
          res.status(500).send({message:'error al actualizar pez'});
        else {
          if(!pezUpdated)
            res.status(404).send({message:'no se ha podido actualizar el pez'});
          else {
            res.status(200).send({pez: pezUpdated, image: file_name});
          }

        }
      });

    }else {
      fs.unlink(file_path, (err) => {
        if(err){
          res.status(200).send({message:'no se pudo borrar el archivo'});
        }else {
          res.status(200).send({message:'Tipo de archivo no es valido'});
        }
      });
    }
  }else{
    res.status(200).send({message:'No se ha subido la imagen'});
  }

}

function getImageFile(req, res){
  var imageFile = req.params.imageFile;
  var path_file = './uploads/images/'+imageFile;

  fs.exists(path_file, function(exists){
    if(exists){
      res.sendFile(path.resolve(path_file));
    }else {
      res.status(404).send({message:'no se encontro la imagen'});
    }
  });
  //res.status(200).send({message:'Obtener imagen'});
}

function deletePez(req, res){
  var pezId = req.params.id;
  Pez.findByIdAndRemove(pezId, (err, pezRemoved)=>{
    if(err){
      res.status(500).send({message:'error en la peticion'});
    }else {
      if(!pezRemoved){
        res.status(404).send({message:'no se borro el pez'});
      }else {
        res.status(200).send({pez: pezRemoved});
      }
    }
  });
}


module.exports = {
  pruebas,
  savePez,
  getPezkaos,
  getPezkao,
  updatePez,
  uploadImage,
  getImageFile,
  deletePez
};
