const mysql = require("mysql");

const mysqlconnection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: 'root',
    password: 'gaius155',
    database: 'area'
});

mysqlconnection.connect((err) => {
    if (err) {
        console.error(`Erreur lors de la connexion : ${err.message}`);
    } else {
        console.log('Connexion réussie');
    }
});
module.exports = mysqlconnection;
