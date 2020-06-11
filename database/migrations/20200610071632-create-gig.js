"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Gigs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profile_image: {
        type: Sequelize.TEXT,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      github_url: {
        type: Sequelize.STRING,
      },
      linkedin_url: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      technologies: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      proficiency: {
        type: Sequelize.STRING,
      },
      stack: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
      },
      profile: {
        type: Sequelize.TEXT,
      },
      experience: {
        type: Sequelize.STRING,
      },
      yoe: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Gigs");
  },
};
