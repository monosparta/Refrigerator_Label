const db = require('../models/index.js');

const { Users } = db;



final_id = async () => {
    const request = await db.Fridge_users.findAll({
        order:[['id','DESC']],
        limit: 1
    })
    return request[0]['id'];

}

create_fridge = async (body) => {
    const return_create_fridge = await Fridge_users.create({
        card_id:body.card_id,
        date:date,
        date_id:body.date_id,
    })
    return return_create_fridge;

}




module.exports = {
    create_fridge,
    final_id
}