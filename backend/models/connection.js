const mysql = require('mysql');
dotenv = require('dotenv').config();

// Mise en place de la base de donnée
let connection = mysql.createConnection({
        host: process.env.HOST,
        port: process.env.DBPORT,
        user: process.env.DBUSER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

connection.connect(function(error) {
    if (error) throw error;
    console.log('You are now connected to MySQL...')
});

module.exports = connection;