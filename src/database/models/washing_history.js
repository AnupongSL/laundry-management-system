'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class washing_histories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  washing_histories.init({
    c_name: DataTypes.STRING,
    c_username: DataTypes.STRING,
    w_id: DataTypes.STRING,
    w_type: DataTypes.STRING,
    w_price: DataTypes.NUMBER,
    time_start: DataTypes.STRING,
    time_stop: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'washing_histories',
    underscored: true,
    freezeTableName: true,
    underscoreAll: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
  return washing_histories;
};