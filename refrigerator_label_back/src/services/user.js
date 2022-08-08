const db = require("../models/index.js");

const is_user = async (body) => {
  return await db.Users.findOne({
    where: {
      cardId: body.cardId,
    },
  });
};

const card_id_find_mail = async (body) => {
  return await db.Users.findOne({
    attributes: ["mail"],
    where: { cardId: body },
  });
};

const create_user = async (body) => {
  return await db.Users.create({
    cardId: body.cardId,
    name: body.name,
    mail: body.mail,
    phone: body.phone,
  });
};

const select_user_all = async () => {
  return await db.Users.findAll();
};

module.exports = {
  select_user_all,
  create_user,
  is_user,
  card_id_find_mail,
};
