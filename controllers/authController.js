
const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const crypto = require('crypto');
require('colors')


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
    if (!usuario) {
        req.flash('error', 'No existe esa cuenta');
        res.redirect('reestablecer');
    }

    //El usuario existe
    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expiracion = Date.now() + 3600000;

    //Guardalos en la base de datos
    await usuario.save();

    // URL de reset
    const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`

    console.log(resetUrl);

}


exports.resetPassword = async (req, res) => {
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token
        }
    });

    /* console.log(usuario); */

    // Si no encuntra el usuario
    if (!usuario) {
        req.flash('error', 'No Válido');
        res.redirect('/reestablecer')
    }

// Formulario para generar el password
    res.render('resetPassword', {
        nombrePagina: 'Reestablecer contraseña'
    })

}
