"use strict";
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    "Profile",
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      github_url: DataTypes.STRING,
      linkedin_url: DataTypes.STRING,
      location: DataTypes.STRING,
      profile_image: DataTypes.TEXT,
      dob: DataTypes.STRING,
      nationality: DataTypes.STRING,
      gender: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      portfolio_url: DataTypes.STRING,
    },
    {}
  );
  Profile.associate = function (models) {
    // associations can be defined here
  };
  return Profile;
};
