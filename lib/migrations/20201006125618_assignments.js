exports.up = function(knex, Promise) {
    return knex.schema.createTable('assignments', table => {
        table.increments('id').primary();
        table.string('projectNmae').notNullable();
        table.string('assignmentTask').notNullable();
        table.string('taskDescription').notNullable();
        table.string('assignTo').notNullable();
    })
};
    
exports.down = function(knex, Promise) {
return knex.schema.dropTable('assignments')
};