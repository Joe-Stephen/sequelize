const Sequelize = require("sequelize");
const dotenv = require("dotenv").config();
const sequelize = new Sequelize(
  process.env.dbName,
  process.env.dbUser,
  process.env.dbPassword,
  {
    dialect: "mysql",
  }
);

const authenticateSequelize = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection successfull.");
  } catch (error) {
    console.error("Error in sequelize authentication function :", err);
  }
};

authenticateSequelize();
