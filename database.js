var mysql = require("mysql");

// Initialize DB connection.
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodelogin"
});

module.exports = connection;
