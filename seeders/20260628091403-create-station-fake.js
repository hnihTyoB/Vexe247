"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "stations",
      [
        {
          name: "Bến xe Miền Trung",
          address: "272 Lê Văn Hiến",
          province: "Đà Nẵng",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bến xe Gia Lâm",
          address: "201 Hải Bà Trưng",
          province: "Hà Nội",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bến xe Miền Đông",
          address: "355 Quốc Lộ 13",
          province: "Hồ Chí Minh",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("stations", null, {});
  },
};
