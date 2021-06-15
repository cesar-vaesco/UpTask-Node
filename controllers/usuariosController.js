const Usuarios = require('../models/Usuarios');
const enviarEmail = require('../handlers/email');
const colors = require('colors');


exports.formCrearCuenta = (req, res) => {
    /* res.send('Funciona....'); */

    res.render('crear-cuenta', {
        nombrePagina: ' Crear cuenta en UpTask'
    })
}

exports.crearCuenta = async (req, res) => {



    //leer los datos
    /* console.log(req.body);
    res.send('Funciona....'); */

    const { email, password } = req.body;

    try {
        //crear el usuario
        await Usuarios.create({

            email,
            password

        });

        //Crear una URL de confirmar
        const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;

        //Crear el objeto de usuario
        const usuario = {
            email
        }

        //Enviar email
        await enviarEmail.enviar({
            usuario,
            subject: 'Confirma tu cuenta UpTask',
            confirmarUrl,
            archivo: 'confirmar-cuenta'
        });

        //Reederigir al usuario
        req.flash('correcto', 'Enviamos un correo, confirmar cuenta')
        res.redirect('/iniciar-sesion');

    } catch (error) {


        console.log(`EL ERROR: ${error}`);

        req.flash('error', error.errors.map || error.errors.map(error => error.message));
        res.render('crear-cuenta', {
            mensajes: req.flash(),
            nombrePagina: ' Crear cuenta en UpTask',
            email,
            password
        })
    }
}


exports.formIniciarSesion = (req, res) => {
    /* console.log(res.locals.mensajes); */
    const { error } = res.locals.mensajes;
    res.render('iniciar-sesion', {
        nombrePagina: ' Inicio de sesión en UpTask',
        error: error
    })
}

exports.formRestablecerPassword = (req, res) => {


    res.render('reestablecer', {
        nombrePagina: 'Restablece tu contraseña!'
    })


}


exports.confirmarCuenta = async (req, res) => {
    /* res.json(req.params.correo); */
    const usuario = await Usuarios.findOne({
        where: {
            email: req.params.correo
        }
    });

    // Si no existe el usuario
    if (!usuario) {
        req.flash('error', 'No Valido');
        res.redirect('/crear-cuenta');
    }

    usuario.activo = 1;
    await usuario.save();

    req.flash('correcto', 'Cuenta activada correctament!!');
    res.redirect('/iniciar-sesion');
}
