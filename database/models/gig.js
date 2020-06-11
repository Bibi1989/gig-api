"use strict";
module.exports = (sequelize, DataTypes) => {
  const Gig = sequelize.define(
    "Gig",
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      profile_image: DataTypes.TEXT,
      phone: DataTypes.STRING,
      github_url: DataTypes.STRING,
      linkedin_url: DataTypes.STRING,
      password: DataTypes.TEXT,
      technologies: DataTypes.ARRAY(DataTypes.STRING),
      proficiency: DataTypes.STRING,
      stack: DataTypes.STRING,
      location: DataTypes.STRING,
      profile: DataTypes.TEXT,
      experience: DataTypes.STRING,
      yoe: DataTypes.STRING,
    },
    {}
  );
  Gig.associate = function (models) {
    // associations can be defined here
  };
  return Gig;
};
