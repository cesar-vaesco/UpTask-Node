
const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
/* const expressValidator = require('express-validator'); */
const flash = require('connect-flash');
const sesion = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
// Imprtar las variables
require('dotenv').config({ path: 'variables.env' })

//Crear la conexión a la base de datos
const db = require('./config/db');

//Importar el modelo de la base de datos
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

//Helpers
const helpers = require('./helpers');

const colors = require('colors');

db.sync()
    .then(() => console.log('Conectado al servidor....'.cyan))
    .catch(error => console.log(error));




//Crear una app de express
const app = express();

// Habilitar body parser para leer los datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

//Agregamos express validator a toda la alicación
/* app.use(expressValidator()); */

//Donde cargar los archivos estaticos
app.use(express.static('public'));

//Habiltar pug
app.set('view engine', 'pug');

//Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// Agregar flash messages
app.use(flash());

app.use(cookieParser());

// Sessiones nos permiten navegar entre distintas páginas sin volvernos a autentificar
app.use(sesion({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


//Pasar vardump a la aplicación y poder usarla
app.use((req, res, next) => {
    /*     console.log(req.user); */
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = { ...req.user } || null;
    /* console.log(res.locals.usuario); */
    next();
});



app.use('/', routes());

//
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;


app.listen(port, host, () => {
    console.log(`El servidor esta LISTO`);
});


/* app.listen(3000); */


/* require('./handlers/email'); */
