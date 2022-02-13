const app = require("./app");
const mongo = require("./configurations/mongodb.js")();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
  secure: true,
});

const server = app.listen(process.env.PORT, () => {
  console.log(
    `App started in ${process.env.NODE_ENV} on port ${process.env.PORT}`
  );
});

process.on("uncaughtException", function (err) {
  console.log("Server shutting down due to uncaught exception: " + err);
  server.close((error) => {
    process.exit(1);
  });
});

process.on("unhandledRejection", function (err) {
  console.log("Server shutting down due to unhandled rejection: " + err);
  server.close((error) => {
    process.exit(1);
  });
});
