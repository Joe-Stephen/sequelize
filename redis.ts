const Redis = require("ioredis");
const dotenv = require("dotenv").config();

const redis = new Redis({
  host: process.env.REDIS_HOSTNAME,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

//testing connection
redis.set("myKey", "myValue", (err, result) => {
  if (err) {
    console.error("Error setting value:", err);
  } else {
    console.log("Value set successfully:", result);
  }
});

redis.get("myKey", (err, result) => {
  if (err) {
    console.error("Error getting value:", err);
  } else {
    console.log("Retrieved value:", result);
  }
});