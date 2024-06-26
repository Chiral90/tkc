require('dotenv').config();
const mysql = require('mysql2/promise');

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const user = process.env.DB_USER;
const password = process.env.DB_PW;
const database = process.env.DB_DATABASE;

const pool = mysql.createPool({
  host,
  port,
  user,
  password,
  database,
  // connectionLimit: 5,
});

module.exports = pool;