const mysql = require('mysql2/promise')

exports.connect = ({
  limit = 1,
  host,
  port,
  user,
  password
}) => {
  return limit > 1
    ? mysql.createConnection({
      connectionLimit: limit,
      host,
      port,
      user,
      password
    })
    : mysql.createPool({
      host,
      port,
      user,
      password
    })
}