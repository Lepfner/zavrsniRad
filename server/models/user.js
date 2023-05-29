const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");
const { DataTypes } = require('sequelize');

const User = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      required: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      required: false,
      allowNull: true,
    },
    surname: {
      type: Sequelize.STRING,
      required: false,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      required: true,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      required: false,
      unique: true,
      allowNull: true,
    },
    location: {
      type: Sequelize.STRING,
      required: false,
      allowNull: true,
    },
    profileimg: {
      type: Sequelize.STRING,
      required: false,
      allowNull: true,
    },
    about: {
      type: Sequelize.STRING,
      required: false,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = User;
