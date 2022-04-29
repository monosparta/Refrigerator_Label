const db = require('../models/index.js');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const user_service = require('../services/user_service.js');
const label_service = require('../services/label_service.js');
const admin_service = require('../services/admin_service.js');
const mail_service = require('../services/mail_service.js');

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
    try{
        const create_users = await user_service.create_users(req.body);
        if(create_users){            
            return res.status(201).json({message:"新增成功"});            
        }
    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }

}

find_label_all = async (req,res) => {
    try{
        const time = await label_service.time_out();
        for(let i = 0; i < time.length; i++){            
        let array = time[i]['date'].split(" ")
        var Today=new Date();
        const date1 = new Date(array[0]);
        const date2 = new Date(Today.getFullYear()+"-"+(Today.getMonth()+1)+"-"+Today.getDate())
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); }

        const label = await label_service.find_label_all();
        label.forEach(item => {
            let array = item['dataValues']['date'].split(" ")
            const date1 = new Date(array[0]);
            const date2 = new Date(Today.getFullYear()+"-"+(Today.getMonth()+1)+"-"+Today.getDate())
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const date = array[0]+" - " + diffDays+" day ago"

            const name = item['dataValues']['User']['dataValues']['name']
            const mail = item['dataValues']['User']['dataValues']['mail']
            item['dataValues']['name'] = name;
            item['dataValues']['mail'] = mail;
            item['dataValues']['date'] = date;
            delete item['dataValues']['User'];
        })
        return res.status(200).json({ message: label });

    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
}



manual_send_mail = async (req,res) => {
    try{        
        await mail_service.manual_send_mail(req.query);
        return res.status(200).json({ message: "寄信成功" });
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
    
}

auto_send_mail = async (req,res) => {
    try{
        await mail_service.auto_send_mail()
        return res.status(200).json({ message: "寄信成功" });
    }catch(err){
        return res.status(500).json({ message: err.message });

    }
}

update_label = async (req,res) => {
    try{
        const update_label =await label_service.update_label(req.body)
        if(update_label){
            return res.status(200).json({message: "修改成功"}); 
        }
        

    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
}

delete_label = async (req, res) => {
    try{
        const delete_label = await label_service.delete_label(req.body['date_id'])
        if(delete_label){
            return res.status(200).json({message: "刪除成功"});
        }
    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
}


create_labels = async (req,res) => {
    try{
        const is_user = await user_service.is_user(req.body);
        if(is_user){    
            const final_id = await label_service.find_final_id();
            if(!final_id?.id){
                data_id = "001";
            }else if(final_id.id > 0 && final_id.id + 1 < 10){
                data_id = "00" + String(final_id.id + 1)
            }else if(final_id.id+1 >= 10 && final_id.id+1 <100 ){
                data_id = "0" + String(final_id.id +1 )
            }else if(final_id.id + 1 >=100 && final_id.id+1<1000){
                data_id = String(final_id.id+1)
            }else{
                data_id = String(final_id.id +1).slice(-3)
            }

            req.body.data_id = data_id;
  
            const label = await label_service.create_labels(req.body);
            if(label){   
                return res.status(201).json({ data_id: label['dataValues']['date_id'],name:label.name});            
            }
        }else{
            return res.status(401).json({message:"user not find"})
        }
    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }

}

login = async (req,res) => {

    try{
        const admin = await admin_service.is_admin(req.body);
        if(admin) {
            if (bcrypt.compareSync(req.body.password, admin.password) == true) {
                const token = await admin_service.token_create(admin);
                return res.status(201).json({message:"登入成功", token:token})
            } else {
                return res.status(401).json({message:"帳號或密碼錯誤"})
            }
        }else{
            return res.status(401).json({message:"帳號或密碼錯誤"})
        }
    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
}
module.exports = {
    find_user_all,
    create_labels,
    create_users,
    find_label_all,
    delete_label,
    auto_send_mail,
    manual_send_mail,
    login
}