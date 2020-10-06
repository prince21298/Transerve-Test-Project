const { Model } = require('objection');
const knex = require('../../Connection/knex')
Model.knex(knex)


class Assignment extends Model {
    static get tableName() {
        return 'assignments';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['projectNmae','assignmentTask','taskDescription','assignTo'],
            properties: {
              id: { type: 'integer' },
              projectNmae: { type: 'string', minLength: 1, maxLength: 255 },
              assignTo:{type:'string'},
              assignmentTask:{type:'string'},
              taskDescription:{type:'string'}
            }
          };
    }
}

module.exports = Assignment;