require("../controller/index.js");
const token_authentication_middleware = require("../middleware/token_authentication");

module.exports = function(router) {

    router.get('/', (req, res) => {
        res.send('Hello World!')
    })
    
    router.post('/api/login',login)

    router.post('/api/create_labels',create_labels);

    router.delete("/api/delete_label", delete_label);

    router.get('/api/auto_send_mail',auto_send_mail)

    router.use(token_authentication_middleware)

    router.get('/api/manual_send_mail',manual_send_mail)


    router.get('/api/find_user_all', find_user_all);

    router.get('/api/find_label_all', find_label_all);

    router.put("/api/update_label",update_label)

    router.post('/api/create_users',create_users);

}