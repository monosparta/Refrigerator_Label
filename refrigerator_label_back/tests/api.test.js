require("dotenv").config();
const request = require("supertest");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
require("../src/routes/index.js")(router);
const app = express();
app.use(express.json());
app.use("/", router);

test("Backend Start Test", (done) => {
  request(app)
    .get("/")
    .expect("Content-Length", "12")
    .end(function (err, res) {
      if (err) return done(err);
      return done();
    });
});

describe("User Test", () => {
  test("Get user", (done) => {
    request(app)
      .get("/api/find_user_all")
      .set("Accept", "application/json")
      .set("token", jwt.sign({ super: "test" }, process.env.JWT_SECRET))
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});

describe("Label Test", () => {
  test("Get Label", (done) => {
    request(app)
      .get("/api/find_label_all")
      .set("Accept", "application/json")
      .set("token", jwt.sign({ super: "test" }, process.env.JWT_SECRET))
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  test("Post Label", (done) => {
    request(app)
      .post("/api/label")
      .set("Accept", "application/json")
      .set("token", jwt.sign({ super: "test" }, process.env.JWT_SECRET))
      .send({ date: "2022-06-27" })
      .expect("Content-Type", /json/)
      .expect(404)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});

describe("Admin Test", () => {
  test("Get admin", (done) => {
    request(app)
      .get("/api/admin")
      .set("Accept", "application/json")
      .set("token", jwt.sign({ super: "test" }, process.env.JWT_SECRET))
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});
