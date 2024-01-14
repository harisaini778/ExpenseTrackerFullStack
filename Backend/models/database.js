const mysql = require('mysql2/promise');

const createConnection = async () => {

    const connection = await mysql.createConnection({
        host : "localhost",
        user : "root",
        password : "mysql123",
        database : "expense_tracker"
    });

    return connection;
};

module.exports = createConnection;