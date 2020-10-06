const { Model } = require('objection');
const knex = require('../../Connection/knex')
Model.knex(knex)


class Users extends Model {
    static get tableName() {
        return 'users';
    }
    static get jsonSchema() {
      return {
        type: 'object',
        required: ['email'],
        properties: {
          id: { type: 'integer' },
          username: { type: 'string', minLength: 1, maxLength: 255 },
          email: { type: 'string' },
          password: { type: 'string' },
          role: {type: 'string'}
        } 
      };
    }
}

module.exports = Users;