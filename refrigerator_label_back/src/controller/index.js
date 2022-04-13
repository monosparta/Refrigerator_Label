const db = require('../models/index.js');
const user_service = require('../services/user_service.js');
const fridge_labels_service = require('../services/fridge_label_service.js');

find_user_all = async (req, res) => {
    try{
        const Users = await user_service.select_user_all();
        return res.status(200).json({ message: Users});

    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }

}

final_id = async (req, res) => {
    try{
        const id = await fridge_labels_service.final_id();
        return res.status(200).json({ message: id});

    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }

}


create_users = async (req,res) => {
    console.log(req.body)

    try{
        const create_users = await user_service.create_users(req.body);
        if(create_users){            
            return res.status(201).json(create_users);            
        }
    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }

}

create_fridge_labels = async (req,res) => {
    console.log(req.body)
    try{
        const fridge = await fridge_labels_service.create_fridge_labels(req.body);
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
    create_fridge_labels,
    create_users,
    final_id
}