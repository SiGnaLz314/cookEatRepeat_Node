/* GET animal listing. */
module.exports = {
    getAnimalPage: (req, res) => {
        let animalName = req.params.animal;
        let message = '';

        let query = "SELECT * FROM `recipes` WHERE `animal` =" + JSON.stringify(animalName) + " ORDER BY id ASC";

        if (animalName.toLowerCase() === 'beef') {
            message = "Beef! It's what's for dinner!";
            page_name = "beef";
        } else if (animalName.toLowerCase() === 'chicken') {
            message = "Winner! Winner! Chicken Dinner!";
            page_name = "chicken";
        } else if (animalName.toLowerCase() === 'lamb') {
            message = "Flavor so good it should be Illegal. On the Lamb!";
            page_name = "lamb";
        } else if (animalName.toLowerCase() === 'pork') {
            message = "This little piggy went to Market!";
            page_name = "pork";
        } else if (animalName.toLowerCase() === 'seafood') {
            message = "Everythings better, when it is wetter...Under the Sea!";
            page_name = "seafood";
        } else if (animalName.toLowerCase() === 'dessert') {
            message = "Eating bread and cakes...getting all Fat and Sassy!";
            page_name = "dessert";
        }

        // execute query
        conn.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render(
                'recipes.ejs',
                { title: animalName, page_name: page_name, message: message, recipes: result }
            );
        });
    },
    animalRecipePage: (req, res) => {
        let recipeId = req.params.id;
        let animalName = req.params.animal;
        let animal = "";
        let message = 'Placeholder for switch statement based on animal type.';

        if (animalName.toLowerCase() === 'beef') {
            message = "Beef! It's what's for dinner!";
            animal = "beef";
        } else if (animalName.toLowerCase() === 'chicken') {
            message = "Winner! Winner! Chicken Dinner!";
            animal = "chicken";
        } else if (animalName.toLowerCase() === 'lamb') {
            message = "Flavor so good it should be Illegal. On the Lamb!";
            animal = "lamb";
        } else if (animalName.toLowerCase() === 'pork') {
            message = "This little piggy went to Market!";
            animal = "pork";
        } else if (animalName.toLowerCase() === 'seafood') {
            message = "Everythings better, when it is wetter...Under the Sea!";
            animal = "seafood";
        } else if (animalName.toLowerCase() === 'dessert') {
            message = "Eating bread and cakes...getting all Fat and Sassy!";
            animal = "dessert";
        }

        //DEV: uncomment
        //let query = "SELECT * FROM `recipes_test` WHERE id =" + JSON.stringify(recipeId);

        //PROD: uncomment
        let query = "SELECT * FROM `recipes` WHERE id =" + JSON.stringify(recipeId);
        conn.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render(
                'animalRecipe.ejs',
                { title: result[0].name, page_name: page_name, message: message, recipe: result[0] }
            );
        });
    }
};