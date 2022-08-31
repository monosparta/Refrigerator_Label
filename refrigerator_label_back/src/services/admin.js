require("dotenv").config();
const db = require("../models/index.js");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const is_admin = (body) => {
  return db.Admins.findOne({
    where: {
      [Op.or]: [{ username: body.username }, { mail: body.username }],
    },
  });
};

const find_admin_all = () => {
  return db.Admins.findAll({
    attributes: ["username", "mail"],
  });
};

const admin_create = (body) => {
  return db.Admins.create({
    username: body.username,
    password: bcrypt.hashSync(body.password, bcrypt.genSaltSync(10)),
    mail: body.mail,
  });
};

const admin_delete = (username) => {
  return db.Admins.destroy({
    where: {
      username: username,
    },
  });
};

const token_create = async (admin_data) => {
  const token = jwt.sign(
    { username: admin_data.username },
    process.env.JWT_SECRET,
    { expiresIn: "60 minutes" }
  );
  await db.Admins.update(
    {
      token: token,
    },
    {
      where: {
        username: admin_data.username,
      },
    }
  );
  return token;
};

const reset_password = (body) => {
  return db.Admins.update(
    {
      password: bcrypt.hashSync(body.password, bcrypt.genSaltSync(10)),
    },
    {
      where: {
        username: body.username,
      },
    }
  );
};

module.exports = {
  is_admin,
  find_admin_all,
  admin_create,
  admin_delete,
  token_create,
  reset_password,
};
