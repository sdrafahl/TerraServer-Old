var express = require('express');

var DataBase = require('../modules/database.js');
var config = require('../config.json');

var router = express.Router();
var database = new DataBase(config.database_dev);

router.post('/create', (request, response) => {
    database.registerUser(request, (callBack) => {
        response.json(callBack);
    });
});

module.exports = router;
