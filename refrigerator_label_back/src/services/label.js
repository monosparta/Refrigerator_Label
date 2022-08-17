const db = require("../models/index.js");

const find_label_all = () => {
  return db.Labels.findAll({
    include: { model: db.Users, attributes: ["name", "mail"] },
    order: [["id", "ASC"]],
    attributes: ["id", "date", "labelId", "note"],
  });
};

const have_id = (id) => {
  return db.Labels.findOne({
    raw: true,
    attributes: ["id"],
    where: { id: id },
  });
};

const delete_label = (labelId) => {
  return db.Labels.destroy({
    where: {
      labelId: labelId,
    },
  });
};

const owner_information = () => {
  return db.Labels.findAll({
    attributes: ["date", "cardId", "labelId"],
  });
};

const update_label = (body) => {
  return db.Labels.update(
    {
      note: body.note,
    },
    {
      where: {
        id: body.id,
      },
    }
  );
};

const last_id = () => {
  return db.Labels.findOne({
    raw: true,
    order: [["id", "DESC"]],
  });
};

const create_label = async (body) => {
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

const printer_state = () => {
  return db.LabelPrinters.findAll();
};

const printer_state_change = (body) => {
  return db.LabelPrinters.update(
    {
      state: body.printerState,
    },
    {
      where: {
        name: body.name,
      },
    }
  );
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
