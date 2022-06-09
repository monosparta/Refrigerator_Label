"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "LabelPrinters",
      [
        {
          printerName: "basic_printer",
          printerType: "QL-700",
          printerState: "success",
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
