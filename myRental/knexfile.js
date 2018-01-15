module.exports = {

    development: {
       client: 'mysql',
       connection: {
         host: '',
         user: 'dev',
         password: 'goon',
         database: 'MY_RENTAL',
         charset: 'utf8'
       }
     },

     testing: {
        client: 'mysql',
        connection: {
          host: '',
          user: 'tester',
          password: 'goon',
          database: 'MY_RENTAL_TEST',
          charset: 'utf8'
        }
      },
};
