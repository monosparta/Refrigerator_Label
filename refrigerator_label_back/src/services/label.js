const db = require("../models/index.js");

find_label_all = async () => {
  const request = await db.Labels.findAll({
    include: { model: db.Users, attributes: ["name", "mail"] },
    order: [["id", "ASC"]],
    attributes: ["id", "date", "labelId", "note"],
  });

  return request;
};

have_id = async (id) => {
  const is_id = await db.Labels.findOne({
    raw: true,
    attributes: ["id"],
    where: { id: id },
  });
  return is_id;
};

delete_label = async (labelId) => {
  const request = await db.Labels.destroy({
    where: {
      labelId: labelId,
    },
  });
  return request;
};

owner_information = async () => {
  const request = await db.Labels.findAll({
    attributes: ["date", "cardId", "labelId"],
  });

  return request;
};

update_label = async (body) => {
  const request = await db.Labels.update(
    {
      note: body.note,
    },
    {
      where: {
        id: body.id,
      },
    }
  );
  return request;
};

last_id = async () => {
  const request = await db.Labels.findOne({
    // raw:true,
    order: [["id", "DESC"]],
  });
  return request;
};

create_label = async (body) => {
  let array = body.date.split(" ");
  let date = array[0].split("-");

  const user = await db.Users.findOne({
    where: {
      cardId: body.cardId,
    },
  });

  const create_label = await db.Labels.create({
    cardId: body.cardId,
    date: body.date,
    labelId: date[1] + date[2] + body.data_id,
  });

  create_label.name = user.name;
  return create_label;
};

printer_state = async () => {
  const printer_state = await db.LabelPrinters.findAll();
  return printer_state;
};

printer_state_change = async (body) => {
  const printer_state_change = await db.LabelPrinters.update(
    {
      state: body.state,
    },
    {
      where: {
        name: body.name,
      },
    }
  );
  return printer_state_change;
};

module.exports = {
  create_label,
  find_label_all,
  delete_label,
  update_label,
  owner_information,
  last_id,
  have_id,
  printer_state,
  printer_state_change,
};
