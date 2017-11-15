'use strict'

//modulos
var bcrypt = require('bcrypt-nodejs');
//modelos
var User = require('../models/user');
//jwt
var jwt = require('../services/jwt');
//acciones
function pruebas(req, res){
  res.status(200).send({
    message: 'provando controlador usuarios y accion pruebas',
    user: req.user
  });
}

function saveUser(req, res){
  //instancia ususario
  var user = new User();
  //params
  var params = req.body;
  //console.log(params);

  if(params.password){
    user.username = params.username;
    user.email = params.email;
    user.role = 'ROLE_USER';

    User.findOne({email: user.email.toLowerCase(), username: user.username.toLowerCase()}, (err, usuario)=>{
      if(err)
        res.status(500).send({message:'error al guardar usuario'});
      else{
        if(!usuario){
          bcrypt.hash(params.password,null,null,function(err, hash){
            user.password = hash;
            user.save((err, userStored) => {
              if(err)
                res.status(500).send({message:'error al guardar usuario'});
              else{
                if(!userStored)
                  res.status(404).send({message:'no se ha registrado el usuario'});
                else{
                  res.status(200).send({user: userStored});
                }
              }
            });
          });
        }
        else{
          res.status(404).send({message:'El usuario ya existe'});
        }
      }
    });

  }
  else{
    res.status(200).send({
      message: 'introduce los datos correctamente'
    });
  }
}

function login(req, res){
  //params
  var params = req.body;

  User.findOne({username: params.username.toLowerCase()}, (err, usuario)=>{
    if(err)
      res.status(500).send({message:'error al guardar usuario'});
    else{
      if(!usuario){
        res.status(404).send({message:'el usuario no existe'});
      }
      else{
        bcrypt.compare(params.password, usuario.password, (err, check)=>{
          if(err)
            res.status(500).send({message:'error al logear el usuario'});
          else{
            if(check){
              if(params.gettoken)
              res.status(200).send({token: jwt.createToke(usuario)});
              else {
                res.status(200).send({usuario});
              }
            }
            else {
              res.status(404).send({message:'contraseña incorrecta'});
            }
          }
        });
      }
    }
  });
}

function updateUser(req, res){
  var userId = req.params.id;
  var update = req.body;
  //console.log(userId);
  //console.log(req.user.sub);
  if(userId != req.user.sub){
    res.status(500).send({message:'no tiene permiso para actualizar el usuario'});
  }
  User.findByIdAndUpdate(userId, update, {new:true}, (err, userUpdated) => {
    if(err)
      res.status(500).send({message:'error al actualizar usuario'});
    else {
      if(!userUpdated)
        res.status(404).send({message:'no se ha podido actualizar el usuario'});
      else {
        res.status(200).send({user: userUpdated});
      }

    }
  });
  //res.status(200).send({message: 'actualizar usuario'});

}

function getKeepers(req, res){
  User.find({role:'ROLE_ADMIN'}).exec((err, users)=>{
    if(err){
      res.status(500).send({message:'Error en la peticion de los admin'});
    }else {
      if(!users)
        res.status(404).send({message:'no hay usuarios tipo admin en el sistema'});
      else {
        res.status(200).send({users});
      }
    }
  });
}

module.exports = {
  pruebas,
  saveUser,
  login,
  updateUser,
  getKeepers
};
