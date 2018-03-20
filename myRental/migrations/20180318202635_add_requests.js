exports.up = function(knex, Promise) {
    knex.schema.dropTable('USERS');
    return knex.schema.createTableIfNotExists('REQUESTS', (table) => {
        table.increments('id').primary();
        table.jsonb('JSON_REQUEST');
        table.date('CREATED');
        table.string('STATE_OF_REQUEST');
        table.string('ADDRESS');
    }).createTable('USERS', (table) => {
        table.increments('id').primary();
        table.string('NAME');
        table.string('PASSWORD');
        table.string('EMAIL');
        table.string('ADDRESS');
        table.string('CITY');
        table.integer('ZIP');
        table.string('STATE');
    }).createTable('USERS_REQUESTS', (table) => {
        table.integer('USERS_id').references('USERS.id');
        table.integer('REQUESTS_id').references('books.id');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('REQUESTS');
        .dropTable('USERS')
        .dropTable('USERS_REQUESTS');
};
