'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      c_name: {
        type: Sequelize.STRING
      },
      c_username: {
        type: Sequelize.STRING
      },
      c_password: {
        type: Sequelize.STRING
      },
      c_line: {
        type: Sequelize.STRING
      },
      c_coin: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      c_role: {
        type: Sequelize.STRING,
        defaultValue: "customer"
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Customers');
  }
};