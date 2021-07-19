const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Admins', [{
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('Password@1234', 10),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Admins')
};
