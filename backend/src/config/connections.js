var mysql      = require('mysql');
var connection = mysql.createPool({
  connectionLimit: 25,
  host     : 'localhost',//Localhost
  user     : 'root',//user database
  password : '123',//password database
  database : 'digi_db',// database name
  debug: false 
});
module.exports = connection;