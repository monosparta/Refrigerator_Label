'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fridge_labels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Fridge_labels.belongsTo(models.Users,{foreignKey: 'card_id'});
      // define association here
    }
  }
  Fridge_labels.init({
    card_id: DataTypes.STRING,
    date: DataTypes.STRING,
    date_id: DataTypes.STRING,
    remark: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Fridge_labels',
  });
  return Fridge_labels;
};