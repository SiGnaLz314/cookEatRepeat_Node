var express = require('express');
var router = express.Router();

module.exports = function(app) {
    app.use("/recipes", require("./recipes"))
    app.use("/upload", require("./upload"))
    

}


module.exports = {
    indexPage: (req, res) => {
        let message = "Hello, World!";

        let query = "SELECT * FROM `recipes` ORDER BY id ASC";

        conn.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render(
                'index.ejs',
                { title: 'Recipes', home: 'active', message: message, recipes: result }
            );
        });
    }
}