import { CommonService as cs } from './services/common.service';
import { readdir, readFileSync } from 'fs';
import { Pool } from 'pg';
import * as logger from 'winston';

// Configure logger settings
logger.configure({
    level: 'debug',
    transports: [
        new logger.transports.Console({
            colorize: true
        })
    ]
});

let connectionString = cs.getEnvironmentVariable('DATABASE_URL');
const pool = new Pool({
    connectionString: connectionString,
    ssl: true,
});

logger.info('Starting migrations ...');

readdir('./migrations', function(err, files) {
    logger.info(`Migrating ${files.length} file(s)`);
    if(err) {
        logger.error('Could not list the directory.', err);
        process.exit(1);
    }

    files.forEach((file, index) => {
        logger.info(`\t[${index}] Migrating: ${file.toString()}`);
        let sql = readFileSync('./migrations/' + file).toString();
        //logger.log('sql', sql);
        pool.query(sql);
    });
    logger.info('Finished migrating!');
});
