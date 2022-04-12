const { searchData } = require("../controller/index.js");


module.exports = function(router) {

    router.get('/', (req, res) => {
        res.send('Hello World!')
    })
    
    // test api

    router.get('/api/hello', find_user_all);

    router.post('/api/create_users',create_users);

    router.post('/api/create_fridge',create_fridge);

    router.get('/api/final_id',final_id)

    

}