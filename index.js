const Sequelize = require("sequelize");
const dotenv = require("dotenv").config();
const sequelize = new Sequelize(
  process.env.dbName,
  process.env.dbUser,
  process.env.dbPassword,
  {
    dialect: "mysql",
    //this will freeze the names of all tables at once
    // define: {
    //   freezeTableName: true,
    // },
  }
);

//authenticating sequelize connection
const authenticateSequelize = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection successfull.");
  } catch (error) {
    console.error("Error in sequelize authentication function :", err);
  }
};

authenticateSequelize();

//defining a model
const User = sequelize.define(
  "user",
  {
    user_id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.DataTypes.STRING,
    },
    age: {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 20,
    },
    wittCodeRocks: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    //this will disable the pluralization for table name. (only for the user table)
    freezeTableName: true,
  }
);

//individual table syncing
// User.sync({ alter: true })
//   .then((data) => {
//     console.log("User table synced successfully.");
//   })
//   .catch((error) => {
//     console.error("Error while syncing user table :", error);
//   });

//multiple table syncing
sequelize.sync({ alter: true });

//drop a single table
// User.drop()
//   .then((data) => {
//     console.log("User table dropped successfully.");
//   })
//   .catch((error) => {
//     console.error("Error while dropping user table :", error);
//   });

//drop multiple tables
// sequelize
//   .drop()
//   .then((data) => {
//     console.log("All tables dropped successfully.");
//   })
//   .catch((error) => {
//     console.error("Error while dropping all tables :", error);
//   });

//drop multiple tables, but with a condition
// sequelize
//   .drop({match:/_test$/})
//   .then((data) => {
//     console.log("All tables dropped successfully.");
//   })
//   .catch((error) => {
//     console.error("Error while dropping all tables :", error);
//   });
// so this command will drop all those tables whose names are ending with `_test`
