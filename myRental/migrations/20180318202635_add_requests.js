exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('REQUESTS', (table) => {
        table.increments('id').primary();
        table.jsonb('JSON_REQUEST');
        table.date('CREATED');
        table.string('STATE_OF_REQUEST');
        table.string('ADDRESS');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('REQUESTS');
};
