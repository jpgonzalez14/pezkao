'use strict'
//configuracion de la app a nivel de express
//servidor

//cargar modulos
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var user_routes = require('./routes/user');
var pez_routes = require('./routes/pez');
var causa_routes = require('./routes/causa');
var receta_routes = require('./routes/receta');
//midleware de body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//configurar cabeceras y cors
app.use((req, res, next) => {
  res.header('Acces-Control-Allow-Origin', '*');
  res.header('Acces-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Acces-Control-Allow-Request-Method');
  res.header('Acces-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE, PUT');
  res.header('Allow', 'GET, POST, OPTIONS, DELETE, PUT');
  next();
});

//configuar rutas body-parser
//si no se quiere prefijo se coloca unicamente el slash
app.use('/api', user_routes);
app.use('/api', pez_routes);
app.use('/api', causa_routes);
app.use('/api', receta_routes);


module.exports = app;
