const db = require('../models/index.js');
const memberService = require('../services/memberService.js');



searchData = async (req, res) => {
    try {
        const cardId = req.query.cardId
        const checkMember = await memberService.isMember(cardId);
        
        if(!checkMember) {
            return res.status(404).json({ message: '非會員,無法生產資料!' });
        }
        
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = {
    searchData
}