const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');

const { loginReq } = require('./src/middleware/middleware');


//pagina de home
route.get('/', homeController.paginacao);

//pagina de login
route.get('/login', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

//contatos
route.get('/contatos', loginReq, contatoController.index);
route.post('/contato/register', loginReq, contatoController.register);
route.get('/contato/index/:id', loginReq, contatoController.edit);
route.post('/contato/edit/:id', loginReq, contatoController.edit);

module.exports = route;