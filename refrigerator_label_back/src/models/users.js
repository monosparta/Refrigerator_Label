"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      // define association here
      Users.hasMany(models.Labels, { foreignKey: "id" });
    }
  }

  Users.init(
    {
      cardId: DataTypes.STRING,
      name: DataTypes.STRING,
      mail: DataTypes.STRING,
      phone: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
