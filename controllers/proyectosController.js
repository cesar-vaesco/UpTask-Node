

const Proyectos = require('../models/Proyectos')
const Tareas = require('../models/Tareas')

const colors = require('colors');

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

exports.nuevoProyecto = async (req, res) => {
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
        console.log(`La información guardada como '${nombre}' ha sido guardada correctamente`.green);
        res.redirect('/');
    }
}

exports.proyectosPorUrl = async (req, res, next) => {
    const proyectosPromise = Proyectos.findAll();

    const proyectoPromise = await Proyectos.findOne({
        where: {
            url: req.params.url
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    //Consultar tareas del proyecto actual
    const tareas = await Tareas.findAll({
        where: {
            proyectoId: proyecto.id
        }/* ,
        include: [
            { model: Proyectos }
        ] */
    });

    //console.log(tareas);

    //En caso de no encontrar la consulta
    if (!proyecto) return next();

    /*
        Castear la respuesta
    console.log(proyecto);
    res.send('OK'); */

    //render a la vista
    res.render('tareas', {
        nombrePagina: 'Tareas del proyecto',
        proyecto,
        proyectos,
        tareas
    });
}

exports.formularioEditar = async (req, res) => {

    const proyectosPromise = Proyectos.findAll();

    const proyectoPromise = await Proyectos.findOne({
        where: {
            id: req.params.id
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    res.render('nuevo-proyecto', {
        nombrePagina: 'Editar Proyecto',
        proyectos,
        proyecto
    });
}


exports.actualizarProyecto = async (req, res) => {
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

        await Proyectos.update(
            { nombre: nombre },
            { where: { id: req.params.id } }
        );
        console.log(`La información actualizada como '${nombre}' ha sido guardada correctamente`.green);
        res.redirect('/');
    }
}

exports.eliminarProyecto = async (req, res, next) => {

    // req, query o params
    console.log(req.query);

    const { urlProyecto } = req.query;

    const resultado = await Proyectos.destroy({ where: { url: urlProyecto } });

    if (!resultado) {
        console.log(resultado);
        return next();
    }

    res.status(200).send('Proyecto eliminado correctamente'.green);
    console.log(resultado);
}
