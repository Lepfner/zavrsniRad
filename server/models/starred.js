const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const Starred = sequelize.define(
  "starred",
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
    user_id: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false,
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Starred;
