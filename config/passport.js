const passport = require('passport');
const LocalStrtegy = require('passport-local').Strategy;

// Referencia al modelo qe se va autenticar
const Usuarios = require('../models/Usuarios');


//local strategy - Login con credenciales propios (usuario y passport)
passport.use(
    new LocalStrtegy(
        // Por default passport espera un usuario y password
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const usuario = await Usuarios.findOne({
                    where: {
                        email,
                        activo: 1
                    }
                });

                // El usuario exist pero el password es incorrecto
                if (!usuario.verificarPassword(password)) {
                    return done(null, false, {
                        message: 'El password es incorrecto'
                    })
                }

                //El email exite y el password es correcto
                return done(null, usuario);

            } catch (error) {
                // Ese usuario no existe
                return done(null, false, {
                    message: 'Esa cuenta no existe'
                })
            }
        }
    )
);

//serializar el usuario
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
});

//deserializar el usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
});


module.exports = passport;
