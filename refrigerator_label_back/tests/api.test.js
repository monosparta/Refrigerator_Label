require("dotenv").config();
const express = require("express");
const router = express.Router();
require("../src/routes/index.js")(router);
const app = express();
app.use(express.json());
app.use("/", router);

const request = require("supertest");

const jwt = require("jsonwebtoken");
const test_token = jwt.sign({ super: "test" }, process.env.JWT_SECRET);

test("Backend Start Test", (done) => {
  request(app)
    .get("/")
    .expect("Content-Length", "12")
    .end(function (err, res) {
      if (err) return done(err);
      return done();
    });
});


describe("Label Test", () => {
  let label_id = "";
  test("Get Label", (done) => {
    request(app)
      .get("/api/find_label_all")
      .set("Accept", "application/json")
      .set("token", test_token)
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
      .set("token", test_token)
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
      .set("token", test_token)
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
      .set("token", test_token)
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
      .set("token", test_token)
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
      .set("token", test_token)
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
      .set("token", test_token)
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
  test("Get Admin", (done) => {
    request(app)
      .get("/api/admin")
      .set("Accept", "application/json")
      .set("token", test_token)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  test("Create Admin Data No Match A", (done) => {
    request(app)
      .post("/api/admin")
      .set("Accept", "application/json")
      .set("token", test_token)
      .send({
        password: "test_root",
        mail: "test_root@mail.com",
      })
      .expect("Content-Type", /json/)
      .expect(403)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  test("Create Admin Data No Match B", (done) => {
    request(app)
      .post("/api/admin")
      .set("Accept", "application/json")
      .set("token", test_token)
      .send({
        username: "test_root",
        mail: "test_root@mail.com",
      })
      .expect("Content-Type", /json/)
      .expect(403)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  test("Create Admin Data No Match C", (done) => {
    request(app)
      .post("/api/admin")
      .set("Accept", "application/json")
      .set("token", test_token)
      .send({
        username: "test_root",
        password: "test_root",
      })
      .expect("Content-Type", /json/)
      .expect(403)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  test("Create Admin Success", (done) => {
    request(app)
      .post("/api/admin")
      .set("Accept", "application/json")
      .set("token", test_token)
      .send({
        username: "test_root",
        password: "test_root",
        mail: "test_root@mail.com",
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  test("Create Admin Again", (done) => {
    request(app)
      .post("/api/admin")
      .set("Accept", "application/json")
      .set("token", test_token)
      .send({
        username: "test_root",
        password: "test_root",
        mail: "test_root@mail.com",
      })
      .expect("Content-Type", /json/)
      .expect(403)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  test("Reset Password Data No Match", (done) => {
    request(app)
      .put("/api/reset_password")
      .set("Accept", "application/json")
      .set("token", test_token)
      .send({})
      .expect("Content-Type", /json/)
      .expect(403)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  test("Reset Password Not Self", (done) => {
    request(app)
      .put("/api/reset_password")
      .set("Accept", "application/json")
      .set("token", test_token)
      .send({ username: "test_root" })
      .expect("Content-Type", /json/)
      .expect(401)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  test("Delete Admin Data No Match", (done) => {
    request(app)
      .delete("/api/admin")
      .set("Accept", "application/json")
      .set("token", test_token)
      .send({})
      .expect("Content-Type", /json/)
      .expect(403)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  test("Delete Admin Success", (done) => {
    request(app)
      .delete("/api/admin")
      .set("Accept", "application/json")
      .set("token", test_token)
      .send({
        username: "test_root",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});
