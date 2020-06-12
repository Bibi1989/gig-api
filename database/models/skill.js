"use strict";
module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define(
    "Skill",
    {
      technologies: DataTypes.STRING,
      proficiency_level: DataTypes.STRING,
      proficiency_percentage: DataTypes.STRING,
      stack_language: DataTypes.STRING,
      bio: DataTypes.TEXT,
      yoe: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      profileId: DataTypes.INTEGER,
    },
    {}
  );
  Skill.associate = function (models) {
    // associations can be defined here
  };
  return Skill;
};
