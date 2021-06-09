const Sequelize = require('sequelize');
const slug = require('slug');
//Importando la configuración de la base de datos
const db = require('../config/db');
const shortid = require('shortid');
const colors = require('colors');


//Definiendo el modelo

const Proyectos = db.define('proyectos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING(100),
    url: Sequelize.STRING(100)
}, {
    hooks: {
        beforeCreate(proyecto) {
            const url = slug(proyecto.nombre).toLowerCase();
            console.log('Antes de insertar en la base de datos'.yellow);
            proyecto.url = `${url}-${shortid.generate()}`;
        }
    }
});

module.exports = Proyectos;
