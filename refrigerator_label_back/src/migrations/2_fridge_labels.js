'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Fridge_labels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      card_id: {
        type: Sequelize.STRING,
        references:{
          model: 'Users',
          key: 'card_id'
        }
      },
      date: {
        type: Sequelize.STRING
      },
      date_id: {
        type: Sequelize.STRING,
      },
      remark: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Fridge_labels');
  }
};