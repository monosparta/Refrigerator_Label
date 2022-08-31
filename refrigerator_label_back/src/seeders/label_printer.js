"use strict";

module.exports = {
  async up(queryInterface, _Sequelize) {
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

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("LabelPrinters", null, {});
  },
};
