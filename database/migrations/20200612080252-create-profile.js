'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      github_url: {
        type: Sequelize.STRING
      },
      linkedin_url: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      profile_image: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.STRING
      },
      nationality: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      portfolio_url: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Profiles');
  }
};