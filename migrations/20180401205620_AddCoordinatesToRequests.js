exports.up = function(knex, Promise) {
    return knex.schema.table('REQUESTS', (table) => {
        table.decimal('LATITUDE');
        table.decimal('LONGITUDE');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('REQUESTS', (table) => {
        table.dropColumn('LATITUDE');
        table.dropColumn('LONGITUDE');
    });
};
