// The database living on the production server is not the one we use on our
// local machine, therefore the settings needed to connect to it will be different.
// On production, we store these settings in environment variables that get read in at run time.
module.exports = {
  "production": {
    "database": process.env.DATABASE_NAME,
    "host":  process.env.DATABASE_HOST,
    "dialect": "postgres",
    "username": process.env.DATABASE_USERNAME,
    "password": process.env.DATABASE_PASSWORD,
    "port": process.env.DATABASE_PORT
  }
};
