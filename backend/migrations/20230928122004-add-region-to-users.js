'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'region', {
      type: Sequelize.STRING,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'region')
  },
};
