
exports.up = function(knex, Promise) {
    return knex.schema.table('REQUESTS', (table) => {
        table.decimal('PRICE');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('REQUESTS', (table) => {
        table.dropColumn('PRICE');
    });
};
