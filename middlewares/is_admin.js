//'use strict'

exports.isAdmin = function(req, res, next){
  if(req.user.role != 'ROLE_ADMIN'){
    res.status(200).send({message: 'No tiene acceso a estos servicios'});
  }else {
    next();
  }
};
