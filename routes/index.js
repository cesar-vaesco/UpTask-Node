
const express = require('express');
const router = require('express').Router();

// Usar express-validator
const { body } = require('express-validator/check');

//Importar el controlador
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');


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

    //Eliminar proyecto
    router.delete('/proyectos/:url', proyectosController.eliminarProyecto);


    //Tareas
    router.post('/proyectos/:url', tareasController.agregarTarea);

    //actualizar tarea
    router.patch('/tareas/:id', tareasController.cambiarEstadoTarea);
    //Eliminar tarea
    router.delete('/tareas/:id', tareasController.eliminarTarea);

    //Crear nueva cuenta
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    router.post('/crear-cuenta', usuariosController.crearCuenta);

    //Iniciar sesion
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion);

    return router;
}
