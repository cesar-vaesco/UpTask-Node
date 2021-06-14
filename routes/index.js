
const express = require('express');
const router = require('express').Router();

// Usar express-validator
const { body } = require('express-validator/check');

//Importar el controlador
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');


module.exports = () => {

    // ruta para el home
    router.get('/',
        authController.usuarioAutenticado,
        proyectosController.proyectosHome
    );

    router.get('/nuevo-proyecto',
        authController.usuarioAutenticado,
        proyectosController.formularioProyecto
    );

    router.post('/nuevo-proyecto',
        authController.usuarioAutenticado,
        //Limpiando la entrada de datos
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto
    );
    // Listar proyecto
    router.get('/proyectos/:url',
        authController.usuarioAutenticado,
        proyectosController.proyectosPorUrl
    );

    //Actualizar el proyecto
    router.get('/proyecto/editar/:id',
        authController.usuarioAutenticado,
        proyectosController.formularioEditar)
        ;

    router.post('/nuevo-proyecto/:id',
        authController.usuarioAutenticado,
        //Limpiando la entrada de datos
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.actualizarProyecto);

    //Eliminar proyecto
    router.delete('/proyectos/:url',
        authController.usuarioAutenticado,
        proyectosController.eliminarProyecto
    );


    //Tareas
    router.post('/proyectos/:url',
        authController.usuarioAutenticado,
        tareasController.agregarTarea
    );

    //actualizar tarea
    router.patch('/tareas/:id',
        authController.usuarioAutenticado,
        tareasController.cambiarEstadoTarea
    );
    //Eliminar tarea
    router.delete('/tareas/:id',
        authController.usuarioAutenticado,
        tareasController.eliminarTarea
    );

    //Crear nueva cuenta
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    router.post('/crear-cuenta', usuariosController.crearCuenta);

    //Iniciar sesion
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
    router.post('/iniciar-sesion', authController.autenticarUsuario);

    //Cerrar sesion
    router.get('/cerrar-sesion', authController.cerrarSesion);

    //Restablecer contraseña
    router.get('/reestablecer', usuariosController.formRestablecerPassword);
    router.post('/reestablecer',authController.enviarToken);
    router.get('/reestablecer/:token', authController.resetPassword);

    return router;
}
