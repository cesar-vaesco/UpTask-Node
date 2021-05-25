const Sequilize = require('sequelize');

//Importando la donfiguración de la base de datos
const db = require('../config/db');


//Definiendo el modelo

const Proyectos = db.define('proyectos', {
    id: {
        type: Sequilize.INTEGER,
        primaryKey: true,
        autoIncremnt: true
    },
    nombre: {
        type: Sequilize.STRING
    },
    url: {
        type: Sequilize.STRING
    }
});

module.exports = Proyectos;
