const mysql = require('mysql2/promise')

exports.connect = ({
  limit = 1,
  host,
  port,
  user,
  password
}) => {
  return limit > 1
    ? mysql.createPool({
      connectionLimit: limit,
      host,
      port,
      user,
      password
    })
    : mysql.createConnection({
      host,
      port,
      user,
      password
    })
}