"use strict";
module.exports = (sequelize, DataTypes) => {
  const Award = sequelize.define(
    "Award",
    {
      title: DataTypes.STRING,
      type: DataTypes.STRING,
      year: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      profileId: DataTypes.INTEGER,
    },
    {}
  );
  Award.associate = function (models) {
    // associations can be defined here
  };
  return Award;
};
