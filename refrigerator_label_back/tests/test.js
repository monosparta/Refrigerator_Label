const request = require("supertest");
const express = require("express");
const router = express.Router();

const app = express();
require("../src/routes/index.js")(router);
app.use("/", router);

request(app)
  .get('/')
  .expect('Content-Length', '12')
  .end(function(err, res) {
    if (err) throw err;
  });