const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');


//pagina de home
route.get('/', homeController.paginacao);

//pagina de login
route.get('/login', loginController.index);
route.post('/login/register', loginController.register);


module.exports = route;