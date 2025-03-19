require("dotenv").config();
const mongoose = require("mongoose");

const DBURL = process.env.MONGODB;

async function connectDb() {
  await mongoose
    .connect(DBURL)
    .then(() => {
      console.log("Database Connected Succesfully");
    })
    .catch((error) => {
      console.error("Error in connecting Database", error);
    });
}

module.exports = { connectDb };
