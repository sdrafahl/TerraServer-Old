var config = require('./config.json');
module.exports = {

    development: {
       client: config.database_dev.client,
       connection: {
         host: config.database_dev.host,
         user: config.database_dev.user,
         password: config.database_dev.password,
         database: config.database_dev.database,
         charset: config.database_dev.charset,
       }
     },

     testing: {
        client: config.database_test.client,
        connection: {
          host: config.database_test.host,
          user: config.database_test.user,
          password: config.database_test.password,
          database: config.database_test.database,
          charset: config.database_test.charset,
        }
      },
};
