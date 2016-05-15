var fs = require('fs'),
    Sequelize = require('sequelize');
    configManager = require('../configFiles/configurationManager');

// This file gathers and associates our models, packaging them together into an object
// that can be exported to our server, or really any other part of the application.
// These sequelize models provide a Javascript interface for querying information straight
// from our postgres database, with no sql necessary - very handy!
module.exports = function () {
  return movieStarDB || loadDatabase();
};

var movieStarDB;
function loadDatabase () {
  var databaseConfig = configManager.getDatabaseConfiguration();

  // Be aware that the databaseConfig being fed to Sequelize is contexual, based on
  // the run time environment. The configManager handles grabbing the right settings.
  var sequelize = new Sequelize(databaseConfig.database, databaseConfig.username, databaseConfig.password,{
    host: databaseConfig.host,
    dialect: "postgres",
    port: databaseConfig.port
  });

  var db = { sequelize: sequelize };

  // import our models
  fs.readdirSync(__dirname+'/../models').forEach(function (file) {
    var model = sequelize.import(__dirname+'/../models/'+file);
    db[model.name] = model;
  });

  // associate our models
  Object.keys(db).forEach(function (modelName) {
    var model = db[modelName];
    if (model.associate) {
      model.associate(db);
    }
  });

  // finally return the database, now loaded with all of our sequelize models
  movieStarDB = db;
  return movieStarDB;
}
