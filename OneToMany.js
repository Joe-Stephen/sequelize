const Sequelize = require("sequelize");
const { DataTypes, Op } = Sequelize;
const dotenv = require("dotenv").config();

const sequelize = new Sequelize(
  process.env.dbName,
  process.env.dbUser,
  process.env.dbPassword,
  {
    dialect: "mysql",
    logging: false, //disable the logging
  }
);

//defining user table
const User = sequelize.define(
  "user",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

//defining posts table
const Post = sequelize.define(
  "post",
  {
    message: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

//associations
User.hasMany(Post, { onDelete: "CASCADE" });
Post.belongsTo(User, { onDelete: "CASCADE" });

//setting posts under appropriate users

// let user, post;
// sequelize
//   .sync({ alter: true })
//   .then(() => {
//     console.log("Synced successfully.");
//     return User.findOne({ where: { username: "Joe" } });
//   })
//   .then((data) => {
//     user = data;
//     console.log("user :", user.toJSON());
//     return Post.findOne({ where: { message: "I am Joe." } });
//   })
//   .then((data) => {
//     post = data;
//     console.log("post :", post.toJSON());
//     return user.addPost(post);
//   })
//   .then((data) => {
//     console.log(data.toJSON());
//   })
//   .catch((error) => {
//     console.error("Error in sync method :", error);
//   });

//demonstrating cascade on deletion

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Synced successfully.");
    return User.destroy({ where: { username: "Lakshman" } });
  })
  .then((data) => {
    console.log("result :", data);
  })
  .catch((error) => {
    console.error("Error in sync method :", error);
  });

// return User.bulkCreate([
//   {
//     username: "Joe",
//     password: "123456",
//   },
//   {
//     username: "Savi",
//     password: "123456",
//   },
//   {
//     username: "Lakshman",
//     password: "123456",
//   },
//   {
//     username: "Varun",
//     password: "123456",
//   },
// ]);

// return Post.bulkCreate([
//   {
//     message: "I am Joe.",
//   },
//   {
//     message: "I am Savi.",
//   },
//   {
//     message: "I am Lakshman.",
//   },
//   {
//     message: "I am Varun.",
//   },
// ]);
