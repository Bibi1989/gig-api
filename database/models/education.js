"use strict";
module.exports = (sequelize, DataTypes) => {
  const Education = sequelize.define(
    "Education",
    {
      institute_name: DataTypes.STRING,
      degree: DataTypes.STRING,
      qualification: DataTypes.STRING,
      start_month: DataTypes.STRING,
      start_year: DataTypes.STRING,
      end_month: DataTypes.STRING,
      end_year: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      profileId: DataTypes.INTEGER,
    },
    {}
  );
  Education.associate = function (models) {
    // associations can be defined here
  };
  return Education;
};
