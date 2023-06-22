'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('washing_histories', {
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
      w_id: {
        type: Sequelize.STRING
      },
      w_type: {
        type: Sequelize.STRING
      },
      w_price: {
        type: Sequelize.INTEGER
      },
      time_start: {
        type: Sequelize.STRING
      },
      time_stop: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('washing_histories');
  }
};