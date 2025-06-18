const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/graphql_task");
  console.log("MongoDB Connected");
};

module.exports = connectDB;


