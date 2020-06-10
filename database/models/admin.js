"use strict";
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    "Admin",
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.TEXT,
    },
    {}
  );
  Admin.associate = function (models) {
    // associations can be defined here
    Admin.hasMany(models.Gig, {
      foreignKey: "adminId",
    });
  };
  return Admin;
};
