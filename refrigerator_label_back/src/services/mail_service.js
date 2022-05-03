const db = require("../models/index.js");
const nodemailer = require("nodemailer");
const label_service = require("../services/label_service.js");
const user_service = require("../services/user_service.js");

manual_send_mail = async (mail) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  var mailOptions = {
    bcc: mail.users,
    from: process.env.NODEMAILER_USER,
    subject: "冰箱物品管理系統提醒",
    html: '<h2>親愛的會員您好：</h2>\n<h2>' + mail.text + '</h2><h4>此封信件為冰箱小精靈自動發送，請勿直接回覆。</h4><br />\
    管理員 Rosa<br /> \
    Trunk Studio |<a href="https://trunk-studio.com/"> trunk-studio.com</a><br />\
    創科資訊股份有限公司<br /> \
    T.04-22019020  #123<br /> \
    F.04-22012870<br /> \
    A.台中市西區台灣大道二段2號16樓之1<br /> \
    Rm. 1, 16F., No.2, Sec. 2, Taiwan Blvd., West Dist., Taichung City 40354, Taiwan (R.O.C.)<br /> \
    <img src="https://imgur.com/7JsC9xl.png" with="400" heigh="300">',
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
    }
  });
  transporter.close();
};

auto_send_mail = async (req, res) => {
  const time = await label_service.time();
  let mail_users = "";
  for (let i = 0; i < time.length; i++) {
    let array = time[i]["date"].split(" ");
    let Today = new Date();
    const date1 = new Date(array[0]);
    const date2 = new Date(
      Today.getFullYear() + "-" + (Today.getMonth() + 1) + "-" + Today.getDate()
    );
    const diff_time = Math.abs(date2 - date1);
    const diff_day = Math.ceil(diff_time / (1000 * 60 * 60 * 24));

    if (diff_day === 7) {
      let mail = await user_service.card_id_find_mail(time[i]["card_id"]);
      mail_users = mail_users + mail["dataValues"]["mail"] + ",";
    }
  }

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.NODEMAILER_USER,
    bcc: mail_users,
    subject: "冰箱物品管理系統提醒",
    html:'<h2>親愛的會員您好：</h2>\n\
    <h2>提醒您，您的物品已經在 Monospace 冰箱放置滿七天，為維護其他會員的使用權益，請您盡快取回物品，取出時請記得掃描條碼，謝謝您的配合</h2>\
    <h4>此封信件為冰箱小精靈自動發送，請勿直接回覆。</h4><br />\
    管理員 Rosa<br /> \
    Trunk Studio |<a href="https://trunk-studio.com/"> trunk-studio.com</a><br />\
    創科資訊股份有限公司<br /> \
    T.04-22019020  #123<br /> \
    F.04-22012870<br /> \
    A.台中市西區台灣大道二段2號16樓之1<br /> \
    Rm. 1, 16F., No.2, Sec. 2, Taiwan Blvd., West Dist., Taichung City 40354, Taiwan (R.O.C.)<br /> \
    <img src="https://imgur.com/7JsC9xl.png" with="400" heigh="300">',
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
    }
  });
  transporter.close();
};

module.exports = {
  manual_send_mail,
  auto_send_mail,
};
