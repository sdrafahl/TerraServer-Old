let express = require('express');

let DataBase = require('../modules/database.js');
let config = require('../config.json');

let router = express.Router();
let database = new DataBase();

router.post('/create', (request, response) => {
    console.log("test");
    database.registerUser(request, (callBack) => {
        response.json(callBack);
    });
});

router.post('/login', (request, response) => {
    database.login(request, (callBack) => {
        response.json(callBack);
    });
});

router.post('/isLoggedIn', (request, response) => {
    let responseValue = false;
    if(request.session.loggedIn === undefined) {
        responseValue = false;
    }
    response.json({ loggedIn: responseValue });

});

module.exports = router;
