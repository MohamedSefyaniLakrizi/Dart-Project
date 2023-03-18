const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'simo2013',
    host: 'localhost',
    port: 5432,
    database: 'dartdb'
});

module.exports = pool;