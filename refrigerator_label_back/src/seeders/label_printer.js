"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "LabelPrinters",
      [
        {
          name: "basic_printer",
          type: "QL-700",
          state: "success",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("LabelPrinters", null, {});
  },
};
