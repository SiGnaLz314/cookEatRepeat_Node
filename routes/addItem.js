
module.exports = {
    addRecipePage: (req, res) => {
        res.render('addItem.ejs', { title: 'addItem'});
    },

    addRecipe: (req, res) => {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let name = req.body.name;
        let animal = req.body.animal;
        let uploadedFile = req.files.image;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        let image_name = name + "." + fileExtension

        // check the filetype before uploading it
        if (uploadedFile.mimetype === 'image/png'
            || uploadedFile.mimetype === 'image/jpeg'
            || uploadedFile.mimetype === 'image/jpg'
            || uploadedFile.mimetype === 'image/gif') {
            // upload the file to the public/images/ directory
            uploadPath = "public/images/" + image_name;

            var ingredients = req.body.variables;
            var directions = req.body.algorithm;

            ingredients = ingredients.split("\n");
            directions = directions.split("\n");

            for (var i = 0; i < ingredients.length; i++) {
                ingredients[i] = ingredients[i].replace(/(?:\\[rn]|[\r\n]+)+/g, "");
                ingredients[i] = "<li>" + ingredients[i] + "</li>";
            }
            for (var i = 0; i < directions.length; i++) {
                directions[i] = directions[i].replace(/(?:\\[rn]|[\r\n]+)+/g, "");
                directions[i] = "<li>" + directions[i] + "</li>";
            }
            ingredients = ingredients.join('');
            directions = directions.join('');


            //TESTING: name="testName", animal="beef", variables="test. variables.", algorithm="test. algorithm."
            //EXPECTED: (id), testName, beef, <li>test. variables</li>, <li>test. algorithm.</li>
            let query = "INSERT INTO `recipes_test` (name, animal, variables, algorithm) VALUES ('"
                                + name + "', '"
                                + animal + "', '"
                                + ingredients + "', '"
                                + directions + "')";
            
            uploadedFile.mv(uploadPath, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                conn.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            });
        } else {
            res.render('addItem.ejs', {
                title: 'Upload'
            });
        }
    }
}

