'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Customers.init({
    c_name: DataTypes.STRING,
    c_username: DataTypes.STRING,
    c_password: DataTypes.STRING,
    c_line: DataTypes.STRING,
    c_coin: DataTypes.NUMBER,
    c_role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customers',
    underscored: true,
    freezeTableName: true,
    underscoreAll: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
  return Customers;
};