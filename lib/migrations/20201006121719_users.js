exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('username').notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.enu('role',['user','admin'],{useNative:false}).defaultTo('user')
    })
};
    
exports.down = function(knex, Promise) {
return knex.schema.dropTable('users')
};