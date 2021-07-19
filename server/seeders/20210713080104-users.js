const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    name: 'Jane Doe',
    groups: ['User', 'Marketing', 'Admin'],
    state: true,
    features: ['View'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }, {
    name: 'Jack Doe',
    groups: ['Marketing', 'Admin'],
    state: false,
    features: ['Create'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }, {
    name: 'Lebron James',
    groups: ['Admin'],
    state: true,
    features: ['Create', 'Update', 'Delete'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users')
};
