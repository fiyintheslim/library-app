const mongoose = require("mongoose");

const connectMongodb = () => {
  mongoose
    .connect(process.env.MONGO, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((res) => {
      console.log(`Mongodb connected`);
    });
};

module.exports = connectMongodb;
