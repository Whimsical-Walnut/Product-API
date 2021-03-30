const mysql = require('mysql2');
const connection = mysql.createPool({
  // host: 'database',
  host: 'ec2-18-188-162-108.us-east-2.compute.amazonaws.com',
  port: 3306,
  user: 'root',
  database: 'productAPI',
  waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit: 0
    // password: 'password',
})

// connection.connect((err) => {
//   if (err) {
//     console.log('failed to connect')
//   } else {
//     console.log('connected to MySql')
//   }
// })

module.exports = connection;