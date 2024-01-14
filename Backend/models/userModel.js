

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

}