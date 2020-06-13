'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Education', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      institute_name: {
        type: Sequelize.STRING
      },
      degree: {
        type: Sequelize.STRING
      },
      qualification: {
        type: Sequelize.STRING
      },
      start_month: {
        type: Sequelize.STRING
      },
      start_year: {
        type: Sequelize.STRING
      },
      end_month: {
        type: Sequelize.STRING
      },
      end_year: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      profileId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Education');
  }
};