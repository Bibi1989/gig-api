'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Skills', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      technologies: {
        type: Sequelize.STRING
      },
      proficiency_level: {
        type: Sequelize.STRING
      },
      proficiency_percentage: {
        type: Sequelize.STRING
      },
      stack_language: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.TEXT
      },
      yoe: {
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
    return queryInterface.dropTable('Skills');
  }
};