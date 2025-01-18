const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cryptho_wallet',
  password: '120920',
  port: 5432,
});

module.exports = pool;
