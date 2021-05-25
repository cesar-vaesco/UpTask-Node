const { Sequelize } = require('sequelize');

const db = new Sequelize('uptasknode', 'root', 'cesar', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306',
    operatorsAliases: false,
    define: {
        timestamps: false
    },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

});

module.exports = db;


/*
    Instrucción que se ejecuta en la linea de comandos del bash de MYSQL para poder crear nuestra base de datos
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'cesar';
    FLUSH PRIVILEGES;
*/
