const db = require('../models/index.js');
const userService = require('../services/userService.js');

findAll = async (req, res) => {
    try{
        const Users = await userService.selectAll();
        return res.status(200).json({ message: Users});

    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }

}

final_id = async (req, res) => {
    try{
        const id = await userService.final_id();
        return res.status(200).json({ message: id});

    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }

}


create_users = async (req,res) => {
    console.log(req.body)

    try{
        const create_users = await userService.create_users(req.body);
        if(create_users){            
            return res.status(201).json(create_users);            
        }
    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }

}

create_fridge = async (req,res) => {
    console.log(req.body)
    try{
        const fridge = await userService.create_fridge(req.body);
        if(fridge){            
            return res.status(201).json(fridge);            
        }
        
    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
}

searchData = async (req, res) => {
    try {
        const cardId = req.query.cardId
        const checkMember = await userService.isMember(cardId);
        
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
    findAll,
    create_fridge,
    create_users,
    final_id
}