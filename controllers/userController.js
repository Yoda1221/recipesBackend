const bcrypt        = require('bcrypt')
const services      = require('../services/methods')
const asyncHandler  = require('express-async-handler')

/**
 ** ALL USERS FROM DATABASE
 *
 * @param { Object} req 
 * @param { Object} res
 ** table { Object} TABLE NAMES FROM BODY (base, join1 ...) 
 ** param2 { Object} PARAMETERS TO WHERE STRING SUCH AS { id: 1 } 
 */
 const allUsers = async (req, res) => {
    const { table } = {table: "users"}
    const resp  = await services.getDataFromDb({base: table}, {  })
    res.status(200).json(resp)
}

const cerateUser = asyncHandler( async (req, res) => {
    const { userName, email, password, passConf } = req.body
    let uniques = { userName, email }
    let uniqArr = []
    //** CONFIRM DATAS
    if (!userName || !email || !password || !passConf) {
        return res.status(400).json({ message: "MISSING DATA!" })
    }
    // TODO:    CHECK IS THE DATA IN THE DATABASE

    //** HASH PASWORD
    const hashedPass = await bcrypt.hash(password, 10)
    const params = { 
        username: userName,
        email: email,
        password: hashedPass
    }
    const resp  = await services.saveDataToDb("users", params )
    res.status(200).json(params)
})

const updateUser = async (req, res) => {
    /* const {  } = req.body
    const resp  = await services.getDataFromDb({base: table}, {  })
    res.status(200).json(resp) */
    res.send("updateUser")
}

const deleteUser = async (req, res) => {
    /* const {  } = req.body
    const resp  = await services.getDataFromDb({base: table}, {  })
    res.status(200).json(resp) */
    res.send("deleteUser")
}

module.exports = {
    allUsers,
    cerateUser,
    updateUser,
    deleteUser
}
