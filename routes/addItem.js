
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
        let file_path = 'Test';
        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = name + '.' + fileExtension;

        // check the filetype before uploading it
        if (uploadedFile.mimetype === 'image/png'
            || uploadedFile.mimetype === 'image/jpeg'
            || uploadedFile.mimetype === 'image/jpg'
            || uploadedFile.mimetype === 'image/gif') {
            // upload the file to the public/images/ directory
            uploadPath = `public/images/${name}`;

            var ingredients = document.getElementById("variables");
            var directions = document.getElementById("algorithm");

            ingredients = ingredients.value.split("\n");
            directions = directions.value.split("\n");

            for (var i = 0; i < ingredients.length(); i++) {
                ingredients[i] = "<li>" + ingredients[i] + "</li>";
            }
            for (var i = 0; i < directions.length(); i++) {
                ingredients[i] = "<li>" + ingredients[i] + "</li>";
            }

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
                title: 'Upload',
                addItem: 'active'
            });
        }
    }
}

