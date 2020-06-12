"use strict";
module.exports = (sequelize, DataTypes) => {
  const Experience = sequelize.define(
    "Experience",
    {
      employer: DataTypes.TEXT,
      country: DataTypes.STRING,
      category: DataTypes.STRING,
      salary: DataTypes.STRING,
      type: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      start_date: DataTypes.STRING,
      end_date: DataTypes.STRING,
      job_responsibility: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      profileId: DataTypes.INTEGER,
    },
    {}
  );
  Experience.associate = function (models) {
    // associations can be defined here
  };
  return Experience;
};
