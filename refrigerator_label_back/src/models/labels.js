'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Labels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Labels.belongsTo(models.Users,{foreignKey: 'card_id'});
      // define association here
    }
  }
  Labels.init({
    card_id: DataTypes.STRING,
    date: DataTypes.STRING,
    date_id: DataTypes.STRING,
    remark: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Labels',
  });
  return Labels;
};