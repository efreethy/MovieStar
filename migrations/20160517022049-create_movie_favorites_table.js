'use strict';

// movie_favorites is known as a join table, because each entry represents an
// association between records from two tables. To fully represent a favorite in
// the database, we record the user_id of the user who favorited the movie, as well
// as the movie_id of the movie that was favorited

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('movie_favorites',{
       id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4
        },
        user_id: {
          type: Sequelize.UUID,
          allowNull: false
        },
        movie_id: {
          type: Sequelize.STRING,
          allowNull: false
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
    return queryInterface.dropTable('movie_favorites');
  }
};
