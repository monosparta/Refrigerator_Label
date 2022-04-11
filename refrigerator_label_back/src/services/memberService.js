const db = require('../models/index.js');

const { User } = db;

const isMember = async (cardId) => {
    const member = await db.members.findOne({
        where: {
            cardId: cardId
        }
    });
    return member;
}
create = async (body) => {
    const Users = await User.create({
        card_id:body.card_id,
        name:body.name,
        email:body.email,
        phone:body.phone,
        root:body.root,
    })
    return Users;

}

selectAll = async () => {
    const request = await db.User.findAll()
    return request;

}


module.exports = {
    isMember,
    selectAll,
    create
}