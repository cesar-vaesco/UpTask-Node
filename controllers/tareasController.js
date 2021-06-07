
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
    const resultado = await Tareas.create({tarea, estado, proyectoId});


    if(!resultado){
        return next();
    }

    //Redireccionar
    res.redirect(`/proyectos/${req.params.url}`);
}
