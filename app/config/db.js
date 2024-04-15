const mysql = require('mysql');

const dbConfig = {
  connectionLimit: 10,
  host: '149.100.151.69',
  user: 'u968764370_LECTOR24',
  password: 'Lector.2024*.',
  database: 'u968764370_LECTOR_PRECIOS',
};

const pool = mysql.createPool(dbConfig);
module.exports = pool;
