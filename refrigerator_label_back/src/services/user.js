const db = require("../models/index.js");

const is_user = (body) => {
  return db.Users.findOne({
    where: {
      cardId: body.cardId,
    },
  });
};

const find_mail = (body) => {
  return db.Users.findOne({
    attributes: ["mail"],
    where: { userId: body },
  });
};

const create_user = (body) => {
  return db.Users.create({
    cardId: body.cardId,
    name: body.name,
    mail: body.mail,
    phone: body.phone,
  });
};

const select_user_all = () => {
  return db.Users.findAll();
};

module.exports = {
  select_user_all,
  create_user,
  is_user,
  find_mail,
};
