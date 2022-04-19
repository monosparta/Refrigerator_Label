const db = require('../models/index.js');
const nodemailer = require('nodemailer');
const user_service = require('../services/user_service.js');
const fridge_label_service = require('../services/fridge_label_service.js');

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
        const Users = await fridge_label_service.find_fridge_label_all();
        return res.status(200).json({ message: Users});

    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
}



manual_send_mail = async (req,res) => {
    console.log("123")
    console.log(req.body.mail)
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });

    var mailOptions = {
        from: process.env.MAIL_USER,
        to: req.body.mail,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    transporter.close();
}

auto_send_mail = async (req,res) => {
    try{
        const time = await fridge_label_service.time_out();
        let all_mail = ""
        for(let i = 0; i < time.length; i++){            
            let array = time[i]['date'].split(" ")
            var Today=new Date();
            const date1 = new Date(array[0]);
            const date2 = new Date(Today.getFullYear()+"-"+(Today.getMonth()+1)+"-"+Today.getDate())
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            
            if(diffDays == 6){
                console.log(time[i]['card_id'])
                let mail = await user_service.care_id_find_mail(time[i]['card_id'])
                all_mail = all_mail+mail['dataValues']['mail']+","                
            }
            
        }
        console.log(all_mail)
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        });
    
        var mailOptions = {
            from: process.env.MAIL_USER,
            to: all_mail,
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
        };
    
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        transporter.close();
        return res.status(200).json({ message: time});

    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
}

update_fridge_label = async (req,res) => {
    try{
        const update_label = await fridge_label_service.update_fridge_label(req.body)
        return res.status(200).json({message: update_label});

    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
}

delete_fridge_label = async (req, res) => {
    try{
        const delete_label = await fridge_label_service.delete_fridge_label(req.body['date_id'])
        return res.status(200).json({message: delete_label});

    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
}



send_email_to_fridge_user = async (req, res) => {
    try{
        const send_email = await fridge_label_service.send_email_to_fridge_user();
        if(send_email){
            return res.status(201).json(send_email);
        }
    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
}

create_fridge_labels = async (req,res) => {
    console.log(req.body)
    try{
        const is_user = await user_service.is_user(req.body);
        if(is_user){
            const fridge_label = await fridge_label_service.create_fridge_labels(req.body);
            if(fridge_label){   
                return res.status(201).json({ data_id: fridge_label['dataValues']['date_id'],name:fridge_label.name});            
            }
        }else{
            return res.status(401).json({message:"user not find"})
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
    delete_fridge_label,
    send_email_to_fridge_user,
    auto_send_mail,
    manual_send_mail

}