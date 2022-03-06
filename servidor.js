require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('conectado a base de dados');
        app.emit('pronto');
    }).catch(e => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');

const { meuMiddleware, checkCrsError, csrfMiddleware } = require('./src/middleware/middleware');

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOpition = session({
    secret: 'dljalçkdjaçkldjalkjdçaljlçaipoipçlçkh',
    store: new MongoStore({ mongoUrl: process.env.CONNECTSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});

app.use(sessionOpition);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());

//middleware
app.use(meuMiddleware);
app.use(checkCrsError);
app.use(csrfMiddleware)
app.use(routes);

app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('online');
        console.log('Acessar: http://localhost:3000')
    });
});