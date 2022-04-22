const { searchData } = require("../controller/index.js");


module.exports = function(router) {

    router.get('/', (req, res) => {
        res.send('Hello World!')
    })
    
    router.get('/api/manual_send_mail',manual_send_mail)

    router.get('/api/auto_send_mail',auto_send_mail)

    router.get('/api/find_user_all', find_user_all);

    router.get('/api/find_label_all', find_label_all);

    router.delete("/api/delete_label", delete_label);

    router.put("/api/update_label",update_label)

    router.post('/api/create_users',create_users);

    router.post('/api/create_labels',create_labels);

    router.post('/api/send_email_to_user',send_email_to_user)

}