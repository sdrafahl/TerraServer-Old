exports.up = function(knex, Promise) {
    return knex.schema.dropTable('USERS');
};

exports.down = function(knex, Promise) {
    return knex.schema.table('USERS', (table) => {
        table.string('ADDRESS');
        table.string('CITY');
        table.integer('ZIP');
        table.string('STATE');
    });
};
