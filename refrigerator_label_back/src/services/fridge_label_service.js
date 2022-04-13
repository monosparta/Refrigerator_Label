const db = require('../models/index.js');






create_fridge_labels = async (body) => {
    const string = "2022-04-13 14:13:35";
    let array = body.date.split(" ")
    let date = array[0].split("-")
    let data_id = ''
    
    const request = await db.Fridge_labels.findAll({
        order:[['id','DESC']],
        limit: 1
    })
    

    if(Number(request[0]['id']+1)>=1000)
    {
        data_id = String(Number(request[0]['id']) + 1).slice(-3)
    }
    else if(Number(request[0]['id']<10)){
        data_id = "00"+ String(Number(request[0]['id']) + 1)
    }else if(Number(request[0]['id']<100)){
        data_id = "0" + String(Number(request[0]['id']) + 1)
    }
    else{
        data_id = String(Number(request[0]['id']) + 1)
    }
    
    const create_fridge_labels = await db.Fridge_labels.create({        
        card_id:body.card_id,
        date:body.date,
        date_id:date[1]+date[2] + data_id
    })
    return create_fridge_labels;

}




module.exports = {
    create_fridge_labels,
    
}