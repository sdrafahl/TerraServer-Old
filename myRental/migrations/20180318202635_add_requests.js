exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('REQUESTS', (table) => {
        table.increments('id').primary();
        table.jsonb('JSON_REQUEST');
        table.date('CREATED')
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('REQUESTS');
};
