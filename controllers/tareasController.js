
const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');


exports.agregarTarea = async (req, res, next) => {
    //res.send('Enviado...');
    //console.log(req.params.url);

    /*
    * findOne = "SELECT * FROM proyectos WHERE id = 20 LIMIT 1;"
    */
    //Obtenmos el pryecto actual
    const proyecto = await Proyectos.findOne({ where: { url: req.params.url } });

    /* Verfiviando la validez de la consulta
     console.log(proyecto);
    console.log(req.body);  - > musetra la url qde l trea declarada en al vista, en el formulario en el input.tarea*/

    //Leer el valor el input
    const { tarea } = req.body;



    //estado 0 = incompleto y ID del proyecto
    const estado = 0;
    const proyectoId = proyecto.id;

    //Insertar en la base de datos
    const resultado = await Tareas.create({ tarea, estado, proyectoId });


    if (!resultado) {
        return next();
    }

    //Redireccionar
    res.redirect(`/proyectos/${req.params.url}`);

}

exports.cambiarEstadoTarea = async (req, res, next) => {
    /* console.log(req.params); */

    const { id } = req.params;
    const tarea = await Tareas.findOne({ where: { id: id } });
    /* console.log(tarea); */

    //Cambiar el estado
    let estado = 0;
    if (tarea.estado === estado) {
        estado = 1;
    }

    tarea.estado = estado;

    const resultado = await tarea.save();

    if (!resultado) return next();

    res.status(200).send('Actualizando...');
}

exports.eliminarTarea = async (req, res, next) => {
    /*     console.log(req.query);
        console.log(req.params); */

    const { id } = req.params;

    const resultado = await Tareas.destroy({ where: { id: id } });

    if (!resultado) return next();

    res.status(200).send('Tarea eliminada....');

}
