'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Labels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cardId: {
        allowNull: false,
        type: Sequelize.STRING,
        references:{
          model: 'Users',
          key: 'cardId'
        }
      },
      date: {
        allowNull: false,
        type: Sequelize.STRING
      },
      labelId: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      note: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Labels');
  }
};