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

//defining country table
const Country = sequelize.define(
  "country",
  {
    countryName: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

//defining capital table
const Capital = sequelize.define(
  "capital",
  {
    capitalName: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

Country.hasOne(Capital, { onDelete: "CASCADE" });
Capital.belongsTo(Country, { onDelete: "CASCADE" });

let country, capital;

//setCapital()

// sequelize
//   .sync({ alter: true })
//   .then(() => {
//     console.log("Synced successfully.");
//     return Capital.findOne({ where: { capitalName: "Madrid" } });
//   })
//   .then((data) => {
//     capital = data;
//     return Country.findOne({ where: { countryName: "Spain" } });
//   }).then((data)=>{
//     country=data;
//     country.setCapital(capital);
//   })
//   .catch((error) => {
//     console.error("Error in sync method :", error);
//   });

// setCountry()

// sequelize
//   .sync({ alter: true })
//   .then(() => {
//     console.log("Synced successfully.");
//     return Country.findOne({ where: { countryName: "France" } });
//   })
//   .then((data) => {
//     country = data;
//     console.log("Country :", data.toJSON());
//     return Capital.findOne({ where: { capitalName: "Paris" } });
//   })
//   .then((data) => {
//     capital = data;
//     console.log("Capital :", data.toJSON());
//     return capital.setCountry(country);
//   })
//   .then((data) => {
//     console.log("Final :", data.toJSON());
//   })
//   .catch((error) => {
//     console.error("Error in sync method :", error);
//   });

//getCapital()

// sequelize
// .sync({ alter: true })
// .then(() => {
//   console.log("Synced successfully.");
//   return Country.findOne({ where: { countryName: "Spain" } });
// })
// .then((data) => {
//   country = data;
//   return country.getCapital()
// })
// .then((data) => {
//   capital = data;
//   console.log(data.toJSON());
// })
// .catch((error) => {
//   console.error("Error in sync method :", error);
// });

//createCapital()

// sequelize
//   .sync({ alter: true })
//   .then(() => {
//     console.log("Synced successfully.");
//     return Country.create({ countryName: "India" });
//   })
//   .then((data) => {
//     country = data;
//     return country.createCapital({
//       capitalName: "New Delhi",
//     });
//   })
//   .then((data) => {})
//   .catch((error) => {
//     console.error("Error in sync method :", error);
//   });

//cascade effect in action

// sequelize
//   .sync({ alter: true })
//   .then(() => {
//     console.log("Synced successfully.");
//     return Country.destroy({ where: { countryName: "India" } });
//   })
//   .then((data) => {
//     country = data;
//     console.log("Result :", data);
//   })
//   .catch((error) => {
//     console.error("Error in sync method :", error);
//   });

//testing by setting multiple references for the same country

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Synced successfully.");
    return Country.findOne({ where: { countryName: "France" } });
  })
  .then((data) => {
    country = data;
    return Capital.findOne({ where: { capitalName: "London" } });
  })
  .then((data) => {
    capital = data;
    return capital.setCountry(country);
  })
  .catch((error) => {
    console.error("Error in sync method :", error);
  });

// Country.bulkCreate([
//   {
//     countryName: "Spain",
//   },
//   {
//     countryName: "Germany",
//   },
//   {
//     countryName: "France",
//   },
//   {
//     countryName: "USA",
//   },
// ]);

// Capital.bulkCreate([
//   {
//     capitalName: "London",
//   },
//   {
//     capitalName: "Madrid",
//   },
//   {
//     capitalName: "Paris",
//   },
//   {
//     capitalName: "Berlin",
//   },
// ]);
