let express = require('express');

let DataBase = require('../modules/database.js');
let config = require('../config.json');

let router = express.Router();
let database = new DataBase();

router.post('/create', (request, response) => {
    database.registerUser(request, (callBack) => {
        response.json(callBack);
    });
});

router.post('/login', (request, response) => {
    database.login(request, (callBack) => {
        response.json(callBack);
    });
});

module.exports = router;
