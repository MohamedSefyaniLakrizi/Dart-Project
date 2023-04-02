const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'eXHu4irRScCwmwG8MfDxGEQgZ3dNq5qS',
    host: 'dpg-cgkg95u4dad69r2c1eg0-a',
    port: 5432,
    database: 'dartdb'
});

module.exports = pool;