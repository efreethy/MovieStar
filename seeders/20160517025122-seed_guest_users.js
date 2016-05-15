var database = require('../db/moviestarDB')();

// Seeder files are run strictly after migrations and are meant to populate the tables
// made by the migrations. In this case I will seed some guest users. Notice that I have
// imported my database, giving me access to my models, which can read / write to the database.

// The sequelize command line interface (CLI) allows us to run our seeders
// via ./node_modules/.bin/sequelize db:seed
module.exports = {
  up: function (queryInterface, Sequelize) {
    return database.User.create({username: 'AlanTuring', password: 'turingtest'})
    .then(function () {
       return  database.User.create({username: 'NikolaTesla', password: 'inductionmotor'});
    })
    .then(function () {
      return   database.User.create({username: 'IsaacNewton', password: 'gravitation'});
    })
    .then(function () {
      return   database.User.create({username: 'JamesMaxwell', password: 'electromagnetism'});
    });
  },

  down: function (queryInterface, Sequelize) {
    return database.User.destroy({
        where: {
          username: { $in: ['AlanTuring', 'NikolaTesla', 'IsaacNewton', 'JamesMaxwell']}
        }
    });
  }
};
