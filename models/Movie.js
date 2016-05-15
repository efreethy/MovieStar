module.exports = function (sequelize, Datatypes) {
  // Each model is coupled to a table in our database, in this case it is the movies table.
  // Here we use sequelize to define our model and associations.

  var Movie = sequelize.define("Movie", {
    id: {
       type: Datatypes.UUID,
       primaryKey: true,
       defaultValue: Datatypes.UUIDV4
     },
  }, {
    tableName: "movies",
    classMethods: {
      associate: function (models) {
        Movie.hasMany(models.MovieFavorite, { foreignKey: 'movie_id' });
        Movie.belongsToMany(models.User, { through: models.MovieFavorite, foreignKey: 'movie_id' });
      }
    }
  });

  return Movie;
};
