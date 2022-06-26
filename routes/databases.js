require('dotenv').config();
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const config = require('../config');
const statusCode = { notExist: "NE", exist: "AE", notMatch: "NM", match: "M", inserted: "I", notInserted: "NI", error: "E", success: true, failed: true };
const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    connectionLimit: config.connectionLimit
});




module.exports = pool;

