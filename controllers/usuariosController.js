const Usuarios = require('../models/Usuarios');


exports.formCrearCuenta = (req, res) => {
    /* res.send('Funciona....'); */

    res.render('crear-cuenta', {
        nombrePagina: ' Crear cuenta en UpTask'
    })
}

exports.crearCuenta = async(req, res) => {

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
        res.redirect('/iniciar-sesion');
    } catch (error) {
        res.render('crear-cuenta', {
            error: error.errors,
            nombrePagina: ' Crear cuenta en UpTask'
        })
    }

}

exports.iniciarSesion = (req, res) =>{


    res.render('iniciar-sesion', {
        nombrePagina: ' Inicio de sesión'
    })
}
