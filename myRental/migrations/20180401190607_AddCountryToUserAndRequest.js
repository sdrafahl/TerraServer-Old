exports.up = function(knex, Promise) {
    return knex.schema.table('REQUESTS', (table) => {
        table.string('COUNTRY');
    }).table('REQUESTS', (table) => {
        table.string('COUNTRY');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('REQUESTS', (table) => {
        table.dropColumn('COUNTRY');
    }).table('REQUESTS', (table) => {
        table.dropColumn('COUNTRY');
    });
};
