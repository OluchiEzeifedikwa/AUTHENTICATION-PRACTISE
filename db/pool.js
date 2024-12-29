const { Pool } = require('pg');
require('dotenv').config();

const dbClient = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,

});

module.exports = dbClient

// module.exports = new Pool({
//     connectionString: "postgreSQL://OluchiEze:mesh4199@localhost:5432/top_users"

// })