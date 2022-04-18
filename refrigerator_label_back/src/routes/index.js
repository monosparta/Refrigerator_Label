const { searchData } = require("../controller/index.js");


module.exports = function(router) {

    router.get('/', (req, res) => {
        res.send('Hello World!')
    })
    router.get('/test', (req, res) => {
        
        const date1 = new Date('4/1/2022');
        const date2 = new Date('3/28/2022');

        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        console.log(diffTime + " milliseconds");
        console.log(diffDays + " days");

        

    })
    router.get('/api/time',time)
    // test api

    router.get('/api/care_id_find_user',care_id_find_user)

    router.get('/api/find_user_all', find_user_all);

    router.get('/api/find_fridge_label_all', find_fridge_label_all);

    router.delete("/api/delete_fridge_label", delete_fridge_label);

    router.put("/api/update_fridge_label",update_fridge_label)

    router.post('/api/create_users',create_users);

    router.post('/api/create_fridge_labels',create_fridge_labels);

    router.post('/api/send_email_to_fridge_user',send_email_to_fridge_user)

}