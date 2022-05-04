require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

// server
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use(express.static(__dirname + "/public"));

//router
const router = express.Router();
require("./routes/index.js")(router);
server.use("/", router);

//cron
var cron = require("node-cron");

cron.schedule("0 14 15 * * *", () => {
  axios.get("http://127.0.0.1:3000/api/auto_send_mail");
});

//port
const PORT = process.env.PORT || 3000;

server.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Server is running on port ${PORT}.`);
});
