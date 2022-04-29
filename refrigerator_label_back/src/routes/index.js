require("../controller/index.js");
const token_authentication_middleware = require("../middleware/token_authentication");

module.exports = function(router) {

    router.get('/', (req, res) => {
        res.send('Hello World!')
    })
    
    router.get('/api/auto_send_mail', auto_send_mail)

    router.post('/api/login', login)

    router.post('/api/label', create_label);

    router.delete('/api/label', delete_label);

    router.use(token_authentication_middleware)

    router.get('/api/manual_send_mail', manual_send_mail)

    router.get('/api/find_user_all', find_user_all);

    router.get('/api/find_label_all', find_label_all);

    router.post('/api/create_user', create_user);

    router.put('/api/update_label', update_label);

}