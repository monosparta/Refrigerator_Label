"use strict";

module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id:"6ce3336d-f626-4ad8-93f3-7ec0c1a20d6e",
          cardId: "1745718229",
          name: "corbin",
          mail: "corbinn0419@gmail.com",
          phone: "0911111111",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:"8a394156-c9f1-4fec-bbdf-1261c202d615",
          cardId: "3128896260",
          name: "bohan",
          mail: "4A790162@stust.edu.tw",
          phone: "0933333333",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:"7d6de51a-b8f4-43eb-a9e4-df845b4f43b2",
          cardId: "1234567890",
          name: "han",
          mail: "qazwsx147866@gmail.com",
          phone: "0922222222",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:"0fa308e9-e2ff-4afb-8dff-65edba1f28f3",
          cardId: "1255870309",
          name: "gary",
          mail: "garyopen1876@gmail.com",
          phone: "0944444444",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
