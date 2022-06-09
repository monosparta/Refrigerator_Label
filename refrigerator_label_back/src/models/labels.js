'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Labels extends Model {
    static associate(models) {
      // define association here
      Labels.belongsTo(models.Users,{ foreignKey: 'cardId', targetKey: 'cardId'});
    }
  }
  Labels.init({
    cardId: DataTypes.STRING,
    date: DataTypes.STRING,
    labelId: DataTypes.STRING,
    note: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Labels',
  });
  return Labels;
};