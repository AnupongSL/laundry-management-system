'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('washing_machines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      w_id: {
        type: Sequelize.STRING
      },
      w_brand: {
        type: Sequelize.STRING
      },
      w_image: {
        type: Sequelize.STRING
      },
      w_type: {
        type: Sequelize.STRING
      },
      w_capacity: {
        type: Sequelize.STRING
      },
      w_price: {
        type: Sequelize.STRING
      },
      w_status: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      w_timer: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('washing_machines');
  }
};