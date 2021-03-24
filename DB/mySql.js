const mysql = require('mysql2');
const connection = mysql.createPool({
  // host: 'database',
  host: 'ec2-18-222-21-251.us-east-2.compute.amazonaws.com',
  port: 3306,
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