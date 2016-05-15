'use strict';

// The migration files  provide a way for us to build our database. This includes
// creating tables, adding or removing columns, etc. The up function serves to make the
// changes we wish, and the down function serves to revert those changes if we make a mistake.

// The sequelize command line interface (CLI) allows us to run our migrations
// via ./node_modules/.bin/sequelize db:migrate
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('movies',{
       id: {
          type: Sequelize.STRING,
          primaryKey: true
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
    return queryInterface.dropTable('movies');
  }
};
