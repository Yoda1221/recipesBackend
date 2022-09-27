const fs            = require('fs')
const fsPromises    = fs.promises
const path          = require("path")
const services      = require('../services/methods')

/**
 ** ALL RECIPES FROM DATABASE
 *
 * @param { Object} req 
 * @param { Object} res
 ** table { Object} TABLE NAMES FROM BODY (base, join1 ...) 
 ** param2 { Object} PARAMETERS TO WHERE STRING SUCH AS { id: 1 } 
 */
const allRecipes = async (req, res) => {
    const { table } = req.query
    const resp  = await services.getDataFromDb({base: table}, {  })
    res.status(200).json(resp)
}

const cerateRecipe = async (req, res) => {
    const file = req?.files?.img ? req?.files?.img : null
    console.log('RFI ', file)
    const filePath = file !== null ? `../recipeImgs/${file.name}` : ""
    if (file !== null) {
        if (!fs.existsSync(path.join(__dirname, '..', 'recipeImgs'))) 
            await fsPromises.mkdir(path.join(__dirname, '..', 'recipeImgs'))

        file.mv(`${__dirname}/../recipeImgs/${file.name}`, err => {
            if (err) {
              console.error(err);
              return res.status(500).send(err);
            }
        
            console.log({ fileName: file.name, filePath });
        })
    }
    /* else {return res.status(400).json({ message: 'NO FILE UPLOADED!' })} */
    const { name, description, completion, type, temperature, completionTime, difficulty } = req.body
    const params = { 
        name,
        type,
        macera: difficulty,
        hofok: temperature,
        elkeszites: completion,
        sutesido: completionTime,
        description: description,
        image: filePath
    }
    const resp  = await services.saveDataToDb("recepts", params )
    res.status(200).json(resp)
}

const updateRecipe = async (req, res) => {
    /* const {  } = req.body
    const resp  = await services.getDataFromDb({base: table}, {  })
    res.status(200).json(resp) */
    res.send("updateRecipe")
}

const deleteRecipe = async (req, res) => {
    /* const {  } = req.body
    const resp  = await services.getDataFromDb({base: table}, {  })
    res.status(200).json(resp) */
    res.send("deleteRecipe")
}


const uploadFile = async (req, res) => {
    const { recipeName, recipeDescription, recipeTemperature, recipeCompletionTime, recipeDifficulty } = req.body
    console.log("🚀 ~ file: recipeController.js ~ line 18 ~ uploadFile ~ files", req.files)
    console.log("🚀 ~ file: recipeController.js ~ line 18 ~ uploadFile ~ body", req.body)
    /* Object.keys(files).forEach(key => {
        const filepath = path.join(__dirname, 'uploadedImages', files[key].name)
        files[key].mv(filepath, (err) => {
            if (err) return res.status(500).json({ status: "error", message: err })
        })
    }) */
    //return res.json({ status: 'success', message: Object.keys(files).toString() })
    return res.json({ status: 'success', message: "Recept mentve" })
}

module.exports = {
    allRecipes,
    uploadFile,
    cerateRecipe,
    updateRecipe,
    deleteRecipe
}
