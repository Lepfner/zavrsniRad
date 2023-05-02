const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const Route = sequelize.define(
  "routes",
  {
    id: {
      type: Sequelize.INTEGER,
      required: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
    },
    geography: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
    },
    about: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
    },
    images: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
    },
    length: {
      type: Sequelize.INTEGER,
      required: true,
      allowNull: false,
    },
    stars: {
      type: Sequelize.INTEGER,
      required: true,
      allowNull: false,
    },
    difficulty: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
    },
    dateAdded: {
      type: Sequelize.DATE,
      required: true,
      allowNull: false,
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Route;
