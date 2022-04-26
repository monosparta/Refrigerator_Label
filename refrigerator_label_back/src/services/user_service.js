const db = require('../models/index.js');



is_user = async (body) => {
    const is_user = await db.Users.findOne({
        where: {
            card_id:body.card_id,
        }
    })
    return is_user;
}

care_id_find_mail = async (body)=> {
    const request = await db.Users.findOne({
        attributes: ['mail'],
        where: { card_id:body },
    })

    return request;
}

create_users = async (body) => {
    const return_create_users = await db.Users.create({
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
    create_users,
    is_user,
    care_id_find_mail
}