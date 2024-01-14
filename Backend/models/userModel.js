

const createConnection = require("./database");


const UserModel = {

initialize :  async () => {

    try {
        const connection= await createConnection();
        await connection.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            premiumUser BOOLEAN DEFAULT FALSE
        )
        `);
        connection.end();
    }catch(err) {
     console.log(`Error in initializing users table`,err)
    }  
},

createUser: async(username,email,password,premiumUser) => {
    try {
        const connection = await createConnection();
        const [result] = await connection.query(
            "INSERT INTO users (username,email,password,premiumUser) VALUES ( ?, ?, ?, ?)",
            [username,email,password,premiumUser]
        );
    }catch(err) {
        console.log("Error creating new user in the database",err);
        throw err;
    }
},

getUserByEmail : async (email) => {
    try {

     const connection = await createConnection();

     const [rows] = await connection.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
     );
     connection.end();

     if(rows.length > 0) {
        return rows[0];
     }else {
        return null;
     }

    }catch(err) {
    console.log("Error checking if users exists by email");
    throw err;
    }
},

getAllUsers: async () => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.query('SELECT * FROM users');
        connection.end();
        return rows;
    } catch (err) {
        console.error('Error fetching users.', err);
        throw err;
    }
},

};

module.exports = UserModel;