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

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection successfull.");
  })
  .catch((err) => {
    console.error("Error in sequelize authentication function :", err);
  });
