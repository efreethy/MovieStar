module.exports = function (sequelize, Datatypes) {
  var User = sequelize.define("User", {
    id: {
       type:  Datatypes.UUID,
       primaryKey: true,
       defaultValue: Datatypes.UUIDV4
     },
     username: {
       type: Datatypes.STRING,
       primaryKey: true
     },
     password: {
       type: Datatypes.STRING
     }
  }, {
    tableName: "users",
    classMethods: {
      associate: function (models) {
        User.hasMany(models.MovieFavorite, { foreignKey: 'user_id' });
        User.belongsToMany(models.Movie, { through: models.MovieFavorite, foreignKey: 'user_id' });
      }
    }
  });

  return User;
};
