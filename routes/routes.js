const express           = require('express')
const router            = express.Router()
const AuthController    = require('../controllers/AuthController')
const { allRecipes, cerateRecipe, deleteRecipe, updateRecipe } = require('../controllers/recipeController')
const { fileExtLimiter, fileSizeLimiter, filesPayloadExists, LoginLimiter } = require('../middlewares')

router.route('/auth/').post(/* LoginLimiter,  */AuthController.login)
router.route('/auth/refresh').get(AuthController.refresh)
router.route('/auth/logout').post(AuthController.logout)

router.route('/recipes').get(allRecipes).post(cerateRecipe).patch(updateRecipe).delete(deleteRecipe)


module.exports = router

/*
router.route('/uploadFile')
    .post(
        fileUpload(
            {createParentPath: true}),
            filesPayloadExists,
            fileExtLimiter(['.png', '.jpg', '.jpeg']
        ),
        fileSizeLimiter,
    uploadFile
    )
*/
        
        
/*
router.route('/recipes')
    .get(recipeController.allRecipes)
    .post(recipeController.cerateRecipe)
    .patch(recipeController.updateRecipe)
    .delete(recipeController.deleteRecipe)
*/
