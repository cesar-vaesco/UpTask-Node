const Sequelize = require('sequelize');
// Extrar valores de variables.env
require('dotenv').config({ path: 'variables.env' })

const db = new Sequelize(

    process.env.DB_NOMBRE,
    process.env.DB_USER,
    process.env.DB_PASS,
    {

        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT,
        operatorsAliases: false,
        define: {
            timestamps: false
        },

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }

    }
);

module.exports = db;


/*
    Instrucción que se ejecuta en la linea de comandos del bash de MYSQL para poder crear nuestra base de datos
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'cesar';
    FLUSH PRIVILEGES;
*/
