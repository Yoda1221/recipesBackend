const express       = require('express')
const router        = express.Router()
const fileUpload    = require("express-fileupload")
const { allRecipes, uploadFile } = require('../controllers/recipeController')
const { 
    fileExtLimiter, 
    fileSizeLimiter, 
    filesPayloadExists } = require('../middlewares')

router.route('/getData').post(allRecipes)
router.route('/uploadFile').post(
    /* fileUpload({createParentPath: true}),
    filesPayloadExists,
    fileExtLimiter(['.png', '.jpg', '.jpeg']),
    fileSizeLimiter, */
    uploadFile
)


module.exports = router
