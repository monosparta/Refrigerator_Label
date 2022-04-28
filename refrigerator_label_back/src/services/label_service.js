const db = require('../models/index.js');


find_label_all = async () => {
    const request = await db.Labels.findAll({
        include: { model: db.Users ,attributes: ['name', 'mail']},
        order: [['id', 'ASC']],
        attributes: [ 'id', 'date', 'date_id', 'remark']
    })
    
    return request;
}

delete_label = async (date_id) => {
    const request = await db.Labels.destroy({
        where: {
            date_id: date_id,
        }
    })
    return request;

}

time_out = async () => {
    const request = await db.Labels.findAll({
        attributes: ['date','card_id']
    })
        
    
    return request;
}




update_label = async (body) => {
    const request = await db.Labels.update({
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

find_final_id = async () =>{
    const request = await db.Labels.findOne({
        order: [['id', 'DESC']],
        limit: 1
    })
    return request;
}

create_labels = async (body) => {
    let array = body.date.split(" ")
    let date = array[0].split("-")

    const user = await db.Users.findOne({
        where: {
            card_id:body.card_id
        }
    })

    const create_labels = await db.Labels.create({
        card_id: body.card_id,
        date: body.date,
        date_id: date[1] + date[2] + body.data_id
    })

    create_labels.name = user.name
    return create_labels;

}




module.exports = {
    create_labels,
    find_label_all,
    delete_label,
    update_label,
    time_out,
    find_final_id


}

