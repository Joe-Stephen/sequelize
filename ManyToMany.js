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
const Customer = sequelize.define(
  "customer",
  {
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

//defining posts table
const Product = sequelize.define(
  "product",
  {
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

//defining posts table
const CustomerProduct = sequelize.define(
  "customerproduct",
  {
    customerproductId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    timestamps: false,
  }
);

//associations
Customer.belongsToMany(Product, { through: CustomerProduct });
Product.belongsToMany(Customer, { through: CustomerProduct });

//adding products under a user

// let customer, products;
// sequelize
//   .sync({ alter: true })
//   .then(() => {
//     console.log("Synced successfully.");
//     return Customer.findOne({ where: { customerName: "Varun" } });
//   })
//   .then((data) => {
//     customer = data;
//     return Product.findAll();
//   })
//   .then((data) => {
//     products = data;
//     customer.addProduct(products);
//   })
//   .catch((error) => {
//     console.error("Error in sync method :", error);
//   });

//demonstration of auto on delete cascade
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Synced successfully.");
    return Customer.destroy({ where: { customerName: "Varun" } });
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error in sync method :", error);
  });

//   Customer.bulkCreate([
//    {
//      customerName: "Joe",
//    },
//    {
//      customerName: "Savi",
//    },
//    {
//      customerName: "Lakshman",
//    },
//    {
//      customerName: "Varun",
//    },
//   ]);

//   Product.bulkCreate([
//      {
//        productName: "car",
//      },
//      {
//        productName: "bike",
//      },
//      {
//        productName: "van",
//      },
//      {
//        productName: "bus",
//      },
//    ]);
