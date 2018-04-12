
exports.up = (knex, Promise) => {
    return knex.schema.createTableIfNotExists('USERS', (table) => {
        table.increments('id').primary();
        table.string('NAME');
        table.string('PASSWORD');
        table.string('EMAIL');
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('USERS');
};
