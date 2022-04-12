const db = require('../models/index.js');

const { Users } = db;

const isMember = async (cardId) => {
    const member = await db.members.findOne({
        where: {
            cardId: cardId
        }
    });
    return member;
}

final_id = async () => {
    const request = await db.Fridge_users.findAll()
    return request;

}

create_fridge = async (body) => {
    var today = new Date();
    var date = today.getFullYear()+"/"+(today.getMonth()+1)+"/"+today.getDate()
    const return_create_fridge = await Fridge_users.create({
        card_id:body.card_id,
        date:date,
        date_id:body.date_id,
        remark:body.remark,
    })
    return return_create_fridge;

}

create_users = async (body) => {
    const return_create_users = await Users.create({
        card_id:body.card_id,
        name:body.name,
        mail:body.mail,
        phone:body.phone,
    })
    return return_create_users;

}

selectAll = async () => {
    const request = await db.Users.findAll()
    return request;

}


module.exports = {
    isMember,
    selectAll,
    create_users,
    create_fridge,
    final_id

}