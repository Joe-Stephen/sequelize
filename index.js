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
      validate: {
        len: [3, 6],
      },
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
sequelize
  .sync({ alter: true })
  .then(() => {
    //working with our updated table
    //creating an object that can be saved to database
    // const user = User.build({
    //   username: "Joe Stephen",
    //   password: "123456",
    //   age: 23,
    //   wittCodeRocks: true,
    // });

    //single creation

    // return User.create({
    //   username: "Savi",
    //   password: "123456",
    //   age: 23,
    //   wittCodeRocks: true,
    // });

    //returning the user creation promise
    //  return user.save();

    //bulk creation
    return User.bulkCreate(
      [
        {
          username: "Joe",
          password: "123456",
          age: 23,
          wittCodeRocks: true,
        },
        {
          username: "Savi",
          password: "123456",
          age: 22,
          wittCodeRocks: false,
        },
        {
          username: "Lakshman",
          password: "123456",
          age: 21,
          wittCodeRocks: true,
        },
        {
          username: "Jo",
          password: "123456",
          age: 23,
          wittCodeRocks: true,
        },
      ],
      { validate: true }
    );
  })
  .then((data) => {
    console.log(data.toJSON());
    console.log("User created successfully.");
  })
  .catch((error) => {
    console.error("Error in creating user :", error);
  });

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
