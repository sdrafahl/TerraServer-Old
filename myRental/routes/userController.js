var express = require('express');

var DataBase = require('../modules/database.js');

var router = express.Router();
var database = new DataBase();

router.post('/create', (request, response) => {
    database.registerUser(request, (callBack) => {
        response.json(callBack);
    });
});

module.exports = router;
