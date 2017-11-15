'use strict'

//cargar modulo
var mongoose = require('mongoose');
//mongoose.Promise = require('bluebird');
var app = require('./app');
var port = process.env.PORT || 3700;

mongoose.connection.openUri('mongodb://157.253.145.190:27017/pezkao', (err, res)=>{
  if(err){
    throw err;
  }
  else{
    console.log('La conexion a la base de datos se realizo correctamente..');
    app.listen(port, () => {
      console.log('el servidor local con node y express esta corriendo correctamente');
    });
  }
});
