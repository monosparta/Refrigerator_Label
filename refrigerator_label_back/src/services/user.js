require("dotenv").config({ path: "../../.env" });
const axios = require("axios");
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

const user_update = async () => {
  let user_list = [];

  await axios
    .get(process.env.USER_GET_URL)
    .then((res) => {
      user_list = res.data["users"];
    })
    .catch((err) => {
      console.log(err);
    });

  for (let i = 0; i < user_list.length; i++) {
    const user = await is_user(user_list[i]);
    if (!user) {
      await db.Users.create({
        id: user_list[i].uuid,
        cardId: user_list[i].cardId,
        name: user_list[i].name,
        mail: user_list[i].email,
        phone: user_list[i].phone,
      });
    } else {
      await db.Users.update(
        {
          cardId: user_list[i].cardId,
          name: user_list[i].name,
          mail: user_list[i].email,
          phone: user_list[i].phone,
        },
        {
          where: {
            id: user_list[i].uuid,
          },
        }
      );
    }
  }
};

module.exports = {
  is_user,
  find_mail,
  user_update,
};
