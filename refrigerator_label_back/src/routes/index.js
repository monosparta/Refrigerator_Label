const { searchData } = require("../controller/index.js");


module.exports = function(router) {

    router.get('/', (req, res) => {
        res.send('Hello World!')
    })
    
    // test api
    router.get('/api/search', searchData);

    router.get('/api/hello', findAll);

    router.post('/api/create',create);

}