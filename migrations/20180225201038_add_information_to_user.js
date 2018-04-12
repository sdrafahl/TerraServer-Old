
exports.up = function(knex, Promise) {
    return knex.schema.table('USERS', (table) => {
        table.string('ADDRESS');
        table.string('CITY');
        table.integer('ZIP');
        table.string('STATE');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('USERS', (table) => {
        table.dropColumn('ADDRESS');
        table.dropColumn('CITY');
        table.dropColumn('ZIP');
        table.dropColumn('STATE');
    });
};
