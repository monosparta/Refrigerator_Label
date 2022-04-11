const db = require('../models/index.js');

const isMember = async (cardId) => {
    const member = await db.members.findOne({
        where: {
            cardId: cardId
        }
    });
    return member;
}


module.exports = {
    isMember
}