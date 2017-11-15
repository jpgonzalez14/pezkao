'use strict'

//modulos
var fs = require('fs');
var path = require('path');
//modelos
var Causa = require('../models/causa');
var Pez = require('../models/pez');

//acciones
function pruebas(req, res){
  res.status(200).send({
    message: 'provando controlador causa y accion pruebas',
    user: req.user
  });
}

function saveCausa(req, res){
  //instancia ususario
  var causa = new Causa();
  //params
  var params = req.body;
  //console.log(params);
  if(params.tipo && params.description){
    causa.tipo = params.tipo;
    causa.description = params.description;
    causa.pez = req.pez.sub;

    causa.save((err, causaStored) => {
      if(err)
        res.status(500).send({message:'error al guardar la causa'});
      else{
        if(!causaStored)
          res.status(404).send({message:'no se ha registrado la causa'});
        else{
          res.status(200).send({causa: causaStored});
        }
      }
    });
  }
  else{
    res.status(200).send({message:'ingrese los datos correctamente'});
  }

}

function getCausasPez(req, res){
  Causa.find({pez: req.params.idPez}).exec((err, causas)=>{
    if(err){
      res.status(500).send({message:'Error en la peticion de las causas de un pez'});
    }else {
      if(!causas)
        res.status(404).send({message:'no hay causas de ese pez en el sistema'});
      else {
        res.status(200).send({causas});
      }
    }
  });
}

function updateCausa(req, res){
  var causaId = req.params.id;
  var update = req.body;
  //console.log(userId);
  //console.log(req.user.sub);
  Pez.findByIdAndUpdate(causaId, update, {new:true}, (err, causaUpdated) => {
    if(err)
      res.status(500).send({message:'error al actualizar la causa'});
    else {
      if(!causaUpdated)
        res.status(404).send({message:'no se ha podido actualizar la causa'});
      else {
        res.status(200).send({causa: causaUpdated});
      }

    }
  });
  //res.status(200).send({message: 'actualizar usuario'});

}

function deleteCausa(req, res){
  var causaId = req.params.id;
  Pez.findByIdAndRemove(causaId, (err, causaRemoved)=>{
    if(err){
      res.status(500).send({message:'error en la peticion'});
    }else {
      if(!causaRemoved){
        res.status(404).send({message:'no se borro la causa'});
      }else {
        res.status(200).send({causa: causaRemoved});
      }
    }
  });
}



module.exports = {
  pruebas,
  saveCausa,
  getCausasPez,
  updateCausa,
  deleteCausa
};
