require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

// server
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: [process.env.FRONTEND_URL],
  methods: "GET,PUT,PATCH,POST,DELETE,OPTIONS",
};
server.use(cors(corsOptions));
server.use(express.static(__dirname + "/public"));

//router
const router = express.Router();
require("./routes/index.js")(router);
server.use("/", router);

//port
const PORT = process.env.PORT || 4002;

server.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Server is running on port ${PORT}.`);
});

//cron
var cron = require("node-cron");
const jwt = require("jsonwebtoken");
cron.schedule(process.env.CORN_SCHEDULE, async () => {
  await axios.get(
    process.env.IP_ADDRESS + ":" + process.env.PORT + "/api/auto_send_mail",
    {
      headers: {
        token: jwt.sign({ "auto-send": "mail" }, process.env.JWT_SECRET),
      },
    }
  );
});
