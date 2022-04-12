const { searchData } = require("../controller/index.js");


module.exports = function(router) {

    router.get('/', (req, res) => {
        res.send('Hello World!')
    })
    
    // test api
    router.get('/api/search', searchData);

    router.get('/api/hello', findAll);

    router.post('/api/create_users',create_users);

    router.post('/api/create_fridge',create_fridge);

    router.post('/api/final_id',final_id)

    

}