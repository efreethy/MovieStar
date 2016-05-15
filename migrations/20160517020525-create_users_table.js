'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('users',{
       id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4
        },
        username: {
          type: Sequelize.STRING,
          primaryKey: true
        },
        password: {
          type: Sequelize.STRING
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        }
      });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
