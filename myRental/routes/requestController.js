let express = require('express');

let DataBase = require('../modules/database.js');
let config = require('../config.json');

let router = express.Router();
let database = new DataBase(config.database_dev);

router.post('/handleRequest', (request, response) => {
    database.handleRequest(request, (callBack) => {
        response.json(callBack);
    });
});

router.post('/searchRequest', (request, response) => {
    database.searchForRequests(request, (callBack) => {
        response.json(callBack);
    });
});

module.exports = router;
