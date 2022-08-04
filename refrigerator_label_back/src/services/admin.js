require("dotenv").config();
const db = require("../models/index.js");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const is_admin = async (body) => {
  const is_admin = await db.Admins.findOne({
    where: {
      [Op.or]: [{ username: body.username }, { mail: body.username }],
    },
  });
  return is_admin;
};

const find_admin_all = async () => {
  const admins = await db.Admins.findAll({
    attributes: ["username", "mail"],
  });
  return admins;
};

const admin_create = async (body) => {
  const admin_create = await db.Admins.create({
    username: body.username,
    password: bcrypt.hashSync(body.password, bcrypt.genSaltSync(10)),
    mail: body.mail,
  });
  return admin_create;
};

const admin_delete = async (username) => {
  const admin_delete = await db.Admins.destroy({
    where: {
      username: username,
    },
  });
  return admin_delete;
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

const reset_password = async (body) => {
  const reset_password = await db.Admins.update(
    {
      password: bcrypt.hashSync(body.password, bcrypt.genSaltSync(10)),
    },
    {
      where: {
        username: body.username,
      },
    }
  );
  return reset_password;
};

module.exports = {
  is_admin,
  find_admin_all,
  admin_create,
  admin_delete,
  token_create,
  reset_password,
};
