const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const Images = sequelize.define(
  "images",
  {
    id: {
      type: Sequelize.INTEGER,
      required: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    route_id: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false,
    },
    image: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Images;
