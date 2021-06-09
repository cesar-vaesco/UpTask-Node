const Sequelize = require('sequelize');
const db = require('../config/db');

const Proyectos = require('./Proyectos')



const Usuarios = db.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoincremet: true
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false
    }

});

// Un usuario puede crear muchos proyectos
/* La asociación A.hasMany (B) significa que existe una relación de uno a varios entre A y B,
* con la clave externa definida en el modelo de destino (B).
*/
Usuarios.hasMany(Proyectos);

module.exports = Usuarios;
