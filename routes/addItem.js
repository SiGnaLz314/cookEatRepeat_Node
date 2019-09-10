
module.exports = {
    addRecipePage: (req, res) => {
        res.render('addItem.ejs', { title: 'addItem' });
    },

    addRecipe: (req, res) => {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let name = req.body.name;
        let animal = req.body.animal;


        let uploadedRecipeFile = req.files.image;
        let uploadedItemFile = req.files.items;


        let fileExtension = uploadedRecipeFile.mimetype.split('/')[1];
        let image_name = "";
        let fileItemExtension = uploadedItemFile.mimetype.split('/')[1];
        let item_name = "";

        if (fileExtension == "jpeg" || fileItemExtension == "jpeg") {
            fileExtension = "jpg";
            fileItemExtension = "jpg";
        }


        let uploadPath = "";
        let uploadItemPath = "";
        let recipeId = "";

        // check the filetype before uploading it
        if (uploadedRecipeFile.mimetype === 'image/png'
            || uploadedRecipeFile.mimetype === 'image/jpeg'
            || uploadedRecipeFile.mimetype === 'image/jpg'
            || uploadedRecipeFile.mimetype === 'image/gif') {

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

            // // TESTING: name="testName", animal="beef", variables="test. variables.", algorithm="test. algorithm."
            // //   EXPECTED POST: (id), testName, beef, <li>test. variables</li>, <li>test. algorithm.</li>
            // //
            //let query = "INSERT INTO `recipes_test` (name, animal, variables, algorithm) VALUES ('"
            //                    + name + "', '"
            //                    + animal + "', '"
            //                    + ingredients + "', '"
            //                    + directions + "')";
            // //
            // //
            // // LIVE Database:
            // //
            let query = "INSERT INTO `recipes` (name, animal, variables, algorithm) VALUES ('"
                + name + "', '"
                + animal + "', '"
                + ingredients + "', '"
                + directions + "')";
            // //

            conn.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                recipeId = result.insertId;
                image_name = recipeId + "_400x300";
                item_name = recipeId + "_recipe";

                let image_file = image_name + "." + fileExtension;
                let item_file = item_name + "." + fileItemExtension;

                // // TESTING Path:
                // //
                //uploadPath = "public/images/test/" + image_file;
                //uploadItemPath = "public/images/test/" + item_file;
                // //
                // // PRODUCTION Path:
                // //
                uploadPath = "public/images/" + image_file;
                uploadItemPath = "public/images/" + item_file;
                // //

                uploadedItemFile.mv(uploadItemPath, (err) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                });
                uploadedRecipeFile.mv(uploadPath, (err) => {
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

