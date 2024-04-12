const mysql = require('mysql');

const dbConfig = {
  connectionLimit: 10,
  host: '149.100.151.52',
  user: '',
  password: '',
  database: '',
};

const pool = mysql.createPool(dbConfig);
module.exports = pool;
