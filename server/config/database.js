const { Sequelize } = require("sequelize");
require("dotenv").config();

module.exports = new Sequelize(
  "postgresql://andrija:wc879BjxdMN0_yhd5NH4-w@nwt-seminar-6022.7tc.cockroachlabs.cloud:26257/BikeApp?sslmode=verify-full"
);
