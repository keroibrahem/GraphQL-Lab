const Driver = require("./models/drivers");
const Car = require("./models/car");

const resolvers = {
    Query: {
        drivers: async () => await Driver.find({}),
        cars: async () => await Car.find({}),
    },
    Mutation: {
      addDriver: async (_, { name, age }) => {
        const driver = new Driver({ name, age });
        return await driver.save();
    },
     addCar: async (_, { driverId, name, model }) => {
      const car = new Car({ name, model });
      await car.save();
      await Driver.findByIdAndUpdate(driverId, {
        $push: { cars: car._id },
      });
      return car;
    },
  },
};

module.exports = resolvers