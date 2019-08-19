
module.exports = {
    addRecipePage: (req, res) => {
        res.render('upload.ejs', { title: 'Upload' });
        console.log(__dirname);
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

        let recipeQuery = "SELECT * FROM `image_uploads` WHERE name = \"name\"";

        conn.recipeQuery(recipeQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                res.render('uplaod.ejs', {
                    title: ' Upload'
                });
            } else {
                // check the filetype before uploading it
                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/jpg' || uploadedFile.mimetype === 'image/gif') {
                    // upload the file to the public/images/Originals/Uploads directory
                    uploadPath = __dirname + 'images/uploads' + name;
                    uploadedFile.mv(uploadPath, (err) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        // send the recipe details to the database
                        let query = "INSERT INTO `image_uploads` (name, animal, file_path) VALUES ('" +
                            name + "', '" + animal + "', '" + file_path + "')";
                        conn.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/upload');
                        });
                    });
                } else {
                    res.render('upload.ejs', {
                        title: 'Upload'
                    });

                }
            }
        });
    }

};
