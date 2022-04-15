const db = require('../models/index.js');
const nodemailer = require('nodemailer');

find_fridge_label_all = async () => {
    const request = await db.Fridge_labels.findAll()
    return request;
}

delete_fridge_label = async (date_id) => {
    const request = await db.Fridge_labels.destroy({
        where: {
            date_id,
        }
    })
    return request;

}

send_email_to_fridge_user = async () => {
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'username@gmail.com',
            pass: ''
        }
    });

    var mailOptions = {
        from: 'username@gmail.com',
        to: 'username@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        console.log("234234")
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

update_fridge_label = async (body) => {
    const request = await db.Fridge_labels.update({
        card_id: body.card_id,
        date: body.date,
        date_id: body.date_id,
        remark: body.remark,
    },
        {
            where: {
                id: body.id,
            }
        }
    )
    return request;
}

create_fridge_labels = async (body) => {
    let array = body.date.split(" ")
    let date = array[0].split("-")
    let data_id = ''

    const request = await db.Fridge_labels.findAll({
        order: [['id', 'DESC']],
        limit: 1
    })
    const user = await db.Users.findOne({
        where: {
            card_id:body.card_id
        }
    })
    
    if (Number(request[0]['id'] + 1) >= 1000) {
        data_id = String(Number(request[0]['id']) + 1).slice(-3)
    }
    else if (Number(request[0]['id'] < 10)) {
        data_id = "00" + String(Number(request[0]['id']) + 1)
    } else if (Number(request[0]['id'] < 100)) {
        data_id = "0" + String(Number(request[0]['id']) + 1)
    }
    else {
        data_id = String(Number(request[0]['id']) + 1)
    }

    const create_fridge_labels = await db.Fridge_labels.create({
        card_id: body.card_id,
        date: body.date,
        date_id: date[1] + date[2] + data_id
    })
    create_fridge_labels.name = user.name
    console.log(create_fridge_labels)
    return create_fridge_labels;

}




module.exports = {
    create_fridge_labels,
    find_fridge_label_all,
    delete_fridge_label,
    update_fridge_label,
    send_email_to_fridge_user

}