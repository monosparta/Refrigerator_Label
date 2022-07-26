require("dotenv").config({ path: "../../.env" });
const axios = require("axios");
const db = require("../models/index.js");
const user_service = require("./user.js");

async function user_create() {
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
    const user = await user_service.is_user(user_list[i]);
    if (!user) {
      await db.Users.create({
        cardId: user_list[i].cardId,
        name: user_list[i].name,
        mail: user_list[i].email,
        phone: user_list[i].phone,
      });
    }
  }
}

user_create();
