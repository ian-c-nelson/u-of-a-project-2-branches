// Set up MySQL connection.
const mysql = require("mysql2");
const config = require("../config/config.json");

let connection;
let options = config[process.env.NODE_ENV];

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {
  connection = mysql.createConnection({
    host: options.host,
    port: 3306,
    user: options.username,
    password: options.password,
    database: options.database,
  });
}

// Make connection.
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;