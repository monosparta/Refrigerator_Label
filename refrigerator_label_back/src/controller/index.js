const db = require('../models/index.js');
const userService = require('../services/userService.js');
const fridge_userService = require('../services/fridge_userService.js');

find_user_all = async (req, res) => {
    try{
        const Users = await userService.select_user_all();
        return res.status(200).json({ message: Users});

    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }

}

final_id = async (req, res) => {
    try{
        const id = await fridge_userService.final_id();
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
        const fridge = await fridge_userService.create_fridge(req.body);
        if(fridge){            
            return res.status(201).json(fridge);            
        }
        
    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
}

module.exports = {
    find_user_all,
    create_fridge,
    create_users,
    final_id
}