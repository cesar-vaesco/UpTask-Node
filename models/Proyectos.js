const slug = require('slug');
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
}, {
    hooks: {
        beforeCreate(proyecto) {

            const url = slug(proyecto.nombre).toLowerCase();
            console.log('Antes de insertar en la base de datos');
            proyecto.url = url;
        }
    }
});

module.exports = Proyectos;
