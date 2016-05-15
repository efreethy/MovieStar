var environment = process.env.NODE_ENV || 'development',
    configFile = require('./' +  environment + '/config.js');

// The configManager is a utility object which returns the appropriate
// configuration settings based on the runtime environment.
module.exports.getDatabaseConfiguration = function () {
  return configFile[environment];
};

module.exports.expressSessionSecret = function () {
  // on production the secret is stored in an environment variable,
  // on development its read from the config
  return environment === "production" ? process.env.EXPRESS_SESSION_SECRET : configFile.EXPRESS_SESSION_SECRET;
};
