exports.up = function(knex, Promise) {
    return knex.schema.table('USERS', (table) => {
        table.string('COUNTRY');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('USERS', (table) => {
        table.dropColumn('COUNTRY');
    });
};
