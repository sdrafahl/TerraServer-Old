let method = logModule.prototype;

let Clrlog = require('clrlog');

let config = require('../config.json');

let myClrlog = null;

function logModule() {
    myClrlog = new Clrlog("LOG", 'success', __dirname + config.log_address, 'LOG:');
};

method.log = (message) => {
    myClrlog.error(message);
}

module.exports = logModule;
