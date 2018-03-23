const logger = require('winston');
const cs = require('./common.service');
const { Pool } = require('pg');

module.exports = {
    getAllRegions,
};

let connectionString = cs.getEnvironmentVariable('DATABASE_URL');
const pool = new Pool({
    connectionString: connectionString,
    ssl: true,
});
pool.on('error', (err) => {
    logger.error('Unexpected error on idle client', err);
    process.exit(-1);
});

/** 
 *  Return all PUBG modes
 */
async function getAllRegions() {
    return pool.query('select * from regions').then((res) => {
        return res.rows;
    });
}