const mongoose = require("mongoose");
const Driver = require("./models/drivers");
const Car = require("./models/car");

const run = async () => {
  await mongoose.connect("mongodb://localhost:27017/graphql_task");
  console.log("✅ Connected to MongoDB");

  // Clear old data
  await Driver.deleteMany({});
  await Car.deleteMany({});

  // Add Drivers
  const kero = new Driver({ name: "kero", age: 25 });
  const ibrahem = new Driver({ name: "ibrahem", age: 29 });

  await kero.save();
  await ibrahem.save();

  // Add Cars
  const cars = [
    { name: "Toyota", model: "2020", driverId: kero._id },
    { name: "BMW", model: "2023", driverId: kero._id },
    { name: "Honda", model: "2019", driverId: ibrahem._id },
    { name: "Kia", model: "2022", driverId: ibrahem._id },
  ];

  await Car.insertMany(cars);

  console.log("✅ Seed data added successfully");
  process.exit();
};

run().catch((err) => console.error(err));
