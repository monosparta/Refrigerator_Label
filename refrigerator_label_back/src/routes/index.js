const { searchData } = require("../controller/index.js");


module.exports = function(router) {

    router.get('/', (req, res) => {
        res.send('Hello World!')
    })
    
    // test api

    router.get('/api/find_user_all', find_user_all);

    router.get('/api/find_fridge_label_all', find_fridge_label_all);

    router.delete("/api/delete_fridge_label", delete_fridge_label);

    router.put("/api/update_fridge_label",update_fridge_label)

    router.post('/api/create_users',create_users);

    router.post('/api/create_fridge_labels',create_fridge_labels);

}