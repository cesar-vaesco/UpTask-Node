
const Sequelize = require('sequelize');

//Importando la donfiguración de la base de datos
const db = require('../config/db');

//Definiendo el modelo

const Proyectos = db.define('proyectos', {
     id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: Sequelize.STRING,
    url: Sequelize.STRING
});

module.exports = Proyectos;
