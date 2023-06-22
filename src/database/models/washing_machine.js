'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class washing_machines extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  washing_machines.init({
    w_id: DataTypes.STRING,
    w_brand: DataTypes.STRING,
    w_image: DataTypes.STRING,
    w_type: DataTypes.STRING,
    w_capacity: DataTypes.STRING,
    w_price: DataTypes.STRING,
    w_status: DataTypes.NUMBER,
    w_timer: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'washing_machines',
    underscored: true,
    freezeTableName: true,
    underscoreAll: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
  return washing_machines;
};