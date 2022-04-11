
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fridge_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Fridge_user.belongsTo(models.User);
      // define association here
    }
  }
  Fridge_user.init({
    card_id: DataTypes.STRING,
    date: DataTypes.STRING,
    date_id: DataTypes.STRING,
    remark: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Fridge_user',
  });
  return Fridge_user;
};