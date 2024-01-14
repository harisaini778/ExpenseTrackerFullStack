/* /backend/server.js */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const createConnection = require('./models/database');
const UserController = require('./controller/userController');

const app = express();

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Establish database connection
createConnection(); // Assuming this function sets up your database connection

// User Controllers access
app.use('/users', UserController);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}.`);
});
