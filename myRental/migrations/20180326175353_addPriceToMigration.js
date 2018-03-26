
exports.up = function(knex, Promise) {
    return knex.schema.table('REQUESTS', (table) => {
        table.decimal('COST');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('REQUESTS', (table) => {
        table.dropColumn('COST');
    });
};
