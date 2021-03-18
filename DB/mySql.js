const mysql = require('mysql');
const connection = mysql.createConnection({
  user: 'root',
  password: 'password',
  database: 'productAPI'
})

connection.connect((err) => {
  if (err) {
    console.log('failed to connect')
  } else {
    console.log('connected to MySql')
  }
})

module.exports = connection;