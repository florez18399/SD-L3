const pg = require('pg');
const client = new pg.Client({
    user: 'sd_l3',
    host: 'localhost',
    database: 'imagesdb',
    password: '123',
    port: 5432,
    ssl: false
    /**
   user: 'postgres',
    host: 'localhost',
    database: 'CS&F',
    password: 'FLOREZ',
    port: 3000
**/
});
client.connect();
module.exports = client;