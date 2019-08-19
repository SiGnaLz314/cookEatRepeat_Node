var express = require('express');
var router = express.Router();

///* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index.ejs', { title: 'Recipes' });
//});

//module.exports = router;



/* GET beef listing. */
module.exports = function(app) {
    app.use("/recipes", require("./recipes"))
    app.use("/upload", require("./upload"))
    

}


/* GET beef listing. */
module.exports = {
    indexPage: (req, res) => {
        res.render('index.ejs', {
            title: 'Recipes'
        });
    }
}