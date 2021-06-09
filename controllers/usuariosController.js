const Usuarios = require('../models/Usuarios');


exports.formCrearCuenta = (req, res) => {
    /* res.send('Funciona....'); */

    res.render('crear-cuenta', {
        nombrePagina: ' Crear cuenta en UpTask'
    })
}

exports.crearCuenta = (req, res) => {

    //leer los datos
    /* console.log(req.body);
    res.send('Funciona....'); */

    const {  email, password } = req.body;



    /*
    //crear el usuario

     */

    Usuarios.create({

        email,
        password

    })
    .then(() => {
        res.redirect('/iniciar-sesion');
    } )



}
