"use strict";
const { Model } = require("sequelize");
const AppError = require("../utils/appError");
module.exports = (sequelize, DataTypes) => {
  class Station extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Station.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [3, 50],
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          checkLen(value) {
            if (value.length >= 5 && value.length <= 100) {
              return true;
            } else {
              throw new AppError(
                "Address must be at least 5 and at most 100 characters long",
                400,
              );
            }
          },
        },
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [["Hà Nội", "Hồ Chí Minh", "Đà Nẵng"]],
        },
      },
    },
    {
      sequelize,
      modelName: "Station",
    },
  );
  return Station;
};
