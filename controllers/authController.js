
const passport = require('passport');

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

    req.session.destroy(()=>{
        res.redirect('/iniciar-sesion');
    })
}
