const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const zlib = require("zlib");
const { DataTypes, Op } = Sequelize;
const dotenv = require("dotenv").config();
const sequelize = new Sequelize(
  process.env.dbName,
  process.env.dbUser,
  process.env.dbPassword,
  {
    dialect: "mysql",
    logging: false, //disable the logging
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
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 6],
      },
    },
    password: {
      type: DataTypes.STRING,
      set(value) {
        //hashing the password
        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(value, salt);
        this.setDataValue("password", hash);
      },
    },
    age: {
      type: DataTypes.INTEGER,
      defaultValue: 20,
    },
    wittCodeRocks: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    description: {
      type: DataTypes.STRING,
      set(value) {
        const compressed = zlib.deflateSync(value).toString("base64");
        this.setDataValue("description", compressed);
      },
      get() {
        const value = this.getDataValue("description");
        const extracted = zlib.inflateSync(Buffer.from(value, "base64"));
        return extracted.toString();
      },
    },
    aboutUser: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.username} : ${this.description}`;
      },
      set(value) {
        throw new Error("You cannot set this value for AboutUser. It is a virtual field.");
      },
    },
  },
  {
    //this will disable the pluralization for table name. (only for the user table)
    freezeTableName: true,
  }
);

//student model
const Student = sequelize.define(
  "student",
  {
    student_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [3, 20],
      },
      get() {
        const rawValue = this.getDataValue("name");
        return rawValue ? rawValue.toUpperCase() : null;
      },
    },
    favorite_class: {
      type: DataTypes.STRING(25),
      defaultValue: "Computer Science",
    },
    school_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    wittCodeSubbed: {
      type: DataTypes.BOOLEAN,
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

    return User.create({
      username: "LLoyd",
      password: "123456",
      age: 25,
      wittCodeRocks: true,
      description:
        "You can take away my house, all my tricks and toys. But one thing you can't take away, I AM IRON MAN.",
      aboutUser: "asdfasdf",
    });

    // return User.findOne({where:{username:'Stark'}})

    //returning the user creation promise

    //  return user.save();
    //bulk creation
    // return Student.bulkCreate(
    //   [
    //     {
    //       name: "Joe",
    //       favorite_class: "Badminton",
    //       school_year: "2010",
    //       wittCodeSubbed: false,
    //     },
    //     {
    //       name: "Savi",
    //       favorite_class: "Football",
    //       school_year: "2009",
    //       wittCodeSubbed: true,
    //     },
    //     {
    //       name: "Lakshman",
    //       favorite_class: "Hockey",
    //       school_year: "2011",
    //       wittCodeSubbed: true,
    //     },
    //     {
    //       name: "Varun",
    //       favorite_class: "Football",
    //       school_year: "2010",
    //       wittCodeSubbed: true,
    //     },
    //     {
    //       name: "Abin",
    //       favorite_class: "Badminton",
    //       school_year: "2009",
    //       wittCodeSubbed: false,
    //     },
    //     {
    //       name: "Ebin",
    //       favorite_class: "Hockey",
    //       school_year: "2010",
    //       wittCodeSubbed: true,
    //     },
    //   ],
    //   { validate: true }
    // );

    // querying
    //findAll()

    // return User.findAll({
    //   attributes: [[sequelize.fn("AVG", sequelize.col("age")), "totalAge"]],
    // });

    //exclude fields

    // return User.findAll({
    //   attributes: {exclude:['password']},
    // });

    //find all users where age less than 45 or equals null

    // return User.findAll({
    //   where:{
    //     age:{
    //       [Op.or]:{
    //         [Op.lt]:45,
    //         [Op.eq]:null
    //       }
    //     }
    //   }
    // })

    //find all users whose name has exactly 6 letters

    // return User.findAll({
    //   where: sequelize.where(
    //     sequelize.fn("char_length", sequelize.col("username")),
    //     11
    //   ),
    // });

    //find the maximum age from the users table

    // return User.sum("age");

    //finding number of students whose favorite_class=computer science or if they are subbed to wittCode

    // return Student.findAll({
    //   attributes: ["name"],
    //   where: {
    //     [Op.or]: {
    //       favorite_class: { [Op.eq]: "Computer Science" },
    //       wittCodeSubbed: { [Op.eq]: true },
    //     },
    //   },
    // });

    //finding number of students in each school_year

    // return Student.findAll({
    //   attributes: [
    //     "school_year",
    //     [sequelize.fn("COUNT", sequelize.col("school_year")), "num_students"],
    //   ],
    //   group: "school_year",
    // });

    // return Student.findAll();
  })
  .then((data) => {
    console.log("query completed successfully.");
    console.log(data.toJSON());

    // data.forEach((element) => {
    //   console.log(element.toJSON());
    // });
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
