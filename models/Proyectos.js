const Sequelize = require('sequelize');
const slug = require('slug');
//Importando la configuración de la base de datos
const db = require('../config/db');
const shortid = require('shortid');


//Definiendo el modelo

const Proyectos = db.define('proyectos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        default: () => nanoid()
    },
    nombre: Sequelize.STRING,
    url: Sequelize.STRING
}, {
    hooks: {
        beforeCreate(proyecto) {

            const url = slug(proyecto.nombre).toLowerCase();
            console.log('Antes de insertar en la base de datos');
            proyecto.url = `${url}-${shortid.generate()}`;
        }
    }
});

module.exports = Proyectos;
