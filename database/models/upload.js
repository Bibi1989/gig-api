"use strict";
module.exports = (sequelize, DataTypes) => {
  const Upload = sequelize.define(
    "Upload",
    {
      title: DataTypes.STRING,
      upload_cv: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
      profileId: DataTypes.INTEGER,
    },
    {}
  );
  Upload.associate = function (models) {
    // associations can be defined here
  };
  return Upload;
};
