var mysql = require('mysql');
require('dotenv').config()
var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: 3306
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});