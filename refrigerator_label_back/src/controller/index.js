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

find_fridge_label_all = async (req,res) => {
    try{
        const Users = await fridge_labels_service.find_fridge_label_all();
        return res.status(200).json({ message: Users});

    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
}

delete_fridge_label = async (req, res) => {
    try{
        const delete_label = await fridge_labels_service.delete_fridge_label(req.body['id'])
        return res.status(200).json({message: delete_label});

    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
}

create_fridge_labels = async (req,res) => {
    console.log(req.body)
    try{
        
        const fridge_label = await fridge_labels_service.create_fridge_labels(req.body);
        if(fridge_label){            
            return res.status(201).json(fridge_label);            
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
    find_fridge_label_all,
    delete_fridge_label

}