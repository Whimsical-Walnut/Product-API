const mysql = require('mysql2');
const connection = mysql.createPool({
  host: 'database',
  user: 'root',
  // password: 'password',
  database: 'productAPI',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

// connection.connect((err) => {
//   if (err) {
//     console.log('failed to connect')
//   } else {
//     console.log('connected to MySql')
//   }
// })

module.exports = connection;