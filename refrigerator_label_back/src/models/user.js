
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Fridge_user,{
        foreignKey:'card_id'

      });
      // define association here
    }
  }
  User.init({
    card_id: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    root: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};