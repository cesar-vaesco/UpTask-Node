
const passport = require('passport');
const Usuarios = require('../models/Usuarios');

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'

});


// Función para revisar si el usuario esta logueado
exports.usuarioAutenticado = (req, res, next) => {

    //Si el usuario esta autenticado
    if (req.isAuthenticated()) {
        return next();
    }

    // Si no esta autenticado, redirigir el formulario
    return res.redirect('/iniciar-sesion');
}

// Fubnción para cerrar sesion
exports.cerrarSesion = (req, res, next) => {

    req.session.destroy(() => {
        res.redirect('/iniciar-sesion');
    })
}

//Genera un tokne si el usuario es valido
exports.enviarToken = async (req, res) => {

    // Verdicar si el usuario exista
    const { email } = req.body;
    const usuario = await Usuarios.findOne({ where: { email: email } })

    // Si no existe el usuario
    if(!usuario){
        req.flash('error', 'No existe esa cuenta');
        res.render('reestablecer', {
            nombrePagina: 'Restablecer tu contraseña',
            mensajes: req.flash()
        })
    }else {
        console.log('La cuenta existe...');

    }
}
