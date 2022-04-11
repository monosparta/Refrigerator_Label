const db = require('../models/index.js');
const memberService = require('../services/memberService.js');

findAll = async (req, res) => {
    try{
        const Users = await memberService.selectAll();
        return res.status(200).json({ message: Users});

    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }

}

create = async (req,res) => {
    console.log(req.body)
    try{
        const Users = await memberService.create(req.body);
        if(Users){            
            return res.status(201).json(Users);            
        }
        
    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
}

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
    searchData,
    findAll
}