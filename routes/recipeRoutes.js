const express           = require('express')
const router            = express.Router()
const recipeController  = require('../controllers/recipeController')

router.route('/')
    .get(recipeController.allRecipes)
    .post(recipeController.cerateRecipe)
    .patch(recipeController.updateRecipe)
    .delete(recipeController.deleteRecipe) 

module.exports = router
