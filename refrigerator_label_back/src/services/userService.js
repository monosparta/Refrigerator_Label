const db = require('../models/index.js');

const { Users } = db;


create_users = async (body) => {
    const return_create_users = await Users.create({
        card_id:body.card_id,
        name:body.name,
        mail:body.mail,
        phone:body.phone,
    })
    return return_create_users;

}

select_user_all = async () => {
    const request = await db.Users.findAll()
    return request;

}


module.exports = {
    select_user_all,
    create_users
}