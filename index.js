
const express = require('express');

//Crear una app de express
const app = express();

// ruta para el home

app.use('/', (req, res) => {
    res.send('Hola....')
});
app.listen(3000);
