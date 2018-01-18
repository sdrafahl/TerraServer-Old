var config = require('./config.json');
module.exports = {
    development: config.database_dev,
     testing: config.database_test,
};
