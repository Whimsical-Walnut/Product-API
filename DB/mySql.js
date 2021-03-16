const mysql = require('mysql');
const connection = mysql.createConnection({
  user: 'root',
  password: 'secret',
  database: 'productAPI'
})

connection.connect((err) => {
  if (err) {
    console.log('failed to connect')
  } else {
    console.log('connected to MySql')
  }
})

