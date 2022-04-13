const db = require('../models/index.js');





final_id = async () => {
    const request = await db.Fridge_labels.findAll({
        order:[['id','DESC']],
        limit: 1
    })
    return request[0]['id'];

}

create_fridge_labels = async (body) => {
    const create_fridge_labels = await Fridge_labels.create({
        card_id:body.card_id,
        date:date,
        date_id:body.date_id,
    })
    return create_fridge_labels;

}




module.exports = {
    create_fridge_labels,
    final_id
}