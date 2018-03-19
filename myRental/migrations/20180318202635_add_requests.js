exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('REQUESTS', (table) => {
        table.increments('id').primary();
        table.jsonb('JSON_REQUEST');
        table.date('CREATED');
        table.string('STATE_OF_REQUEST');
        table.integer('REQUESTER_ID');
        table.integer('REQUESTIE_ID');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('REQUESTS');
};
