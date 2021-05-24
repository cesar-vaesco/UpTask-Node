
const express = require('express');
const router = require('express').Router();


//Impostar el controlador
const proyectosController = require('../controllers/proyectosController')


module.exports = () => {

    // ruta para el home
    router.get('/', proyectosController.proyectosHome);
    router.get('/nuevo-proyecto', proyectosController.formularioProyecto );


    return router;
}
