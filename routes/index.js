
const express = require('express');
const router = require('express').Router();

// Usar express-validator
const { body } = require('express-validator/check');

//Importar el controlador
const proyectosController = require('../controllers/proyectosController')


module.exports = () => {

    // ruta para el home
    router.get('/', proyectosController.proyectosHome);
    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
    router.post('/nuevo-proyecto',
        //Limpiando la entrada de datos
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto);
    // Listar proyecto
    router.get('/proyectos/:url', proyectosController.proyectosPorUrl);

    //Actualizar el proyecto
    router.get('/proyecto/editar/:id', proyectosController.formularioEditar);
    router.post('/nuevo-proyecto/:id',
        //Limpiando la entrada de datos
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.actualizarProyecto);

    return router;
}
