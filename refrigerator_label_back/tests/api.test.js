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
  let label_id = "";
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

  test("Post Label Data No Match A", (done) => {
    request(app)
      .post("/api/label")
      .set("Accept", "application/json")
      .set("token", jwt.sign({ super: "test" }, process.env.JWT_SECRET))
      .send({ date: "2022-06-27" })
      .expect("Content-Type", /json/)
      .expect(403)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  test("Post Label Data No Match B", (done) => {
    request(app)
      .post("/api/label")
      .set("Accept", "application/json")
      .set("token", jwt.sign({ super: "test" }, process.env.JWT_SECRET))
      .send({ cardId: "1234567890" })
      .expect("Content-Type", /json/)
      .expect(403)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  test("Post Label No User", (done) => {
    request(app)
      .post("/api/label")
      .set("Accept", "application/json")
      .set("token", jwt.sign({ super: "test" }, process.env.JWT_SECRET))
      .send({ date: "2022-06-27", cardId: "0000000000" })
      .expect("Content-Type", /json/)
      .expect(403)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  test("Post Label Success", (done) => {
    request(app)
      .post("/api/label")
      .set("Accept", "application/json")
      .set("token", jwt.sign({ super: "test" }, process.env.JWT_SECRET))
      .send({ date: "2022-06-28", cardId: "1745718229" })
      .expect("Content-Type", /json/)
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        label_id = res.body.labelId;
        return done();
      });
  });

  test("Delete Label Data No Match", (done) => {
    request(app)
      .delete("/api/label")
      .set("Accept", "application/json")
      .set("token", jwt.sign({ super: "test" }, process.env.JWT_SECRET))
      .send({})
      .expect("Content-Type", /json/)
      .expect(403)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  test("Delete Label Success", (done) => {
    request(app)
      .delete("/api/label")
      .set("Accept", "application/json")
      .set("token", jwt.sign({ super: "test" }, process.env.JWT_SECRET))
      .send({ labelId: label_id })
      .expect("Content-Type", /json/)
      .expect(200)
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
