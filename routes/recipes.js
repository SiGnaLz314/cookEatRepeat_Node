
/* GET animal listing. */
module.exports = {
    /*beefPage: (req, res) => {
        res.render('beef.ejs', {
            title: 'Beef'
        });
    },*/

    getAnimalPage: (req, res) => {
        let animalName = req.params.animal;
        let message = 'Placeholder for switch statement based on animal type.';
        let query = "SELECT * FROM `image_uploads` WHERE `animal` =" + JSON.stringify(animalName) + " ORDER BY id ASC";

        // execute query
        conn.query(query, (err, result) => {
            if (err) {
                res.send(err);
            }
            res.render(
                'recipes.ejs',
                { title: animalName, message: message, recipes: result }
            );
        });
    },
    animalRecipePage: (req, res) => {
        let recipeId = req.params.id;
        let message = 'Placeholder for switch statement based on animal type.';

        let query = "SELECT * FROM `image_uploads` WHERE id =" + JSON.stringify(recipeId);
        conn.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render(
                'animalRecipe.ejs',
                { title: result[0].name, message: message, recipe: result[0] }
            );
        });
    }
};