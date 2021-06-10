
const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
/* const expressValidator = require('express-validator'); */
const flash = require('connect-flash');

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

//Pasar vardump a la aplicación y poder usarla
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    next();
});



app.use('/', routes());


app.listen(3000);
