'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LabelPrinters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LabelPrinters.init({
    printerName: DataTypes.STRING,
    printerType: DataTypes.STRING,
    printerState: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LabelPrinters',
  });
  return LabelPrinters;
};