
const Proyectos = require('../models/Proyectos')



exports.proyectosHome = async (req, res) => {
    const proyectos = await Proyectos.findAll();

    res.render('index', {
        nombrePagina: 'Proyectos',
        proyectos
    });
}

exports.formularioProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll();
    res.render('nuevo-proyecto', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    });
}

exports.nuevoProyecto = async  (req, res) => {
    const proyectos = await Proyectos.findAll();
    // Enviar a la consola lo que el usuario escriba
    //console.log(req.body);

    //Validar campo en el input
    const { nombre } = req.body;

    let errores = [];

    if (!nombre) {
        errores.push({ 'texto': 'Agrega un nombre al proyecto' })
    }

    // Si hay errores
    if (errores.length > 0) {
        res.render('nuevo-proyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos
        })
    } else {
        //No hay errores
        //Insertar en la base de datos


        const proyecto = await Proyectos.create({ nombre });
        console.log(`La información guardada como '${nombre}' ha sido guardada correctamente`);
        res.redirect('/');
    }
}
