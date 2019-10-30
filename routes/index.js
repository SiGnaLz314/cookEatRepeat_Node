var express = require('express');
var router = express.Router();

module.exports = function(app) {
    app.use("/recipes", require("./recipes"))
    app.use("/upload", require("./upload"))
    

}


module.exports = {
    indexPage: (req, res) => {
        let message = "Hello, World!";

        // // TESTING query
        // //
        //let query = "SELECT * FROM `recipes_test` ORDER BY id ASC";
        // // end TESTING
        // //
        // // PRODUCTION query
        // //
        let query = "SELECT * FROM `recipes` ORDER BY id ASC";
        // //end PRODUCTION

        conn.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render(
                'index.ejs',
                { title: 'Recipes', home: 'active', message: message, recipes: result }
            );
        });
        conn.end();
    }
}