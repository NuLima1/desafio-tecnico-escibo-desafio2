const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const PORT = 3000;


const users = [];

app.use(express.json()); 

const usersController = require('./Controllers/usersController');
const authController = require('./Controllers/authController');


usersController(app);
authController(app);

app.listen(PORT, () => {
    console.log(`API online na porta ${PORT}`);
});