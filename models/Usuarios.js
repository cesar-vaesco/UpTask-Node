const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('./Proyectos');
const bcrypt = require('bcrypt-nodejs')

const colors = require('colors');


const Usuarios = db.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false
    }

}, {
    hooks: {
        //Se ejecuta previo a la inserción de la base de datos
        beforeCreate(usuario) {
            /* console.log('Creando nuevo usuario...'.blue);
            console.log(usuario); */
            usuario.password = bcrypt.hashSync(usuario.password,bcrypt.genSaltSync(10));
        }
    }
});

// Un usuario puede crear muchos proyectos
/* La asociación A.hasMany (B) significa que existe una relación de uno a varios entre A y B,
* con la clave externa definida en el modelo de destino (B).
*/

Usuarios.hasMany(Proyectos);

module.exports = Usuarios;
