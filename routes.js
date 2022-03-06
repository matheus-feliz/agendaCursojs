const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const contatoController = require('./src/controllers/contatoController');


//pagina de home
route.get('/', homeController.paginacao);
route.post('/', homeController.paginaPost);

//pagina contato

route.get('/contato', contatoController.paginaInicial);

module.exports = route;