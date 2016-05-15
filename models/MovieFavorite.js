module.exports = function (sequelize, Datatypes) {
  
  var MovieFavorite = sequelize.define("MovieFavorite", {
    id: {
       type:  Datatypes.UUID,
       primaryKey: true,
       defaultValue: Datatypes.UUIDV4
     },
     user_id: {
       type:  Datatypes.UUID,
       allowNull: false
     },
     movie_id: {
       type:  Datatypes.STRING,
       allowNull: false
     },
  }, {
    tableName: "movie_favorites",
    classMethods: {
      associate: function (models) {
        MovieFavorite.belongsTo(models.Movie, { foreignKey: 'movie_id', onDelete: 'cascade'});
        MovieFavorite.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'cascade'});
      }
    }
  });

  return MovieFavorite;
};
