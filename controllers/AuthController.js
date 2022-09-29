const bcrypt        = require('bcrypt')
const jwt           = require('jsonwebtoken')
const services      = require('../services/methods')
const asyncHandler  = require('express-async-handler')

/**
 ** @desc   Login
 ** @route  POST /auth
 ** @access Public
 */
const login = asyncHandler(async (req, res) => {
    //const cookies = req.cookies
    const { email, password } = req.body
    const { table } = {table: "users"}
    const params = { email }

    if (!email || !password) return res.status(400).json({ message: 'ALL FIELDS ARE REQUIRED' })
    const foundUser = await services.getDataFromDb({base: table}, params)
    console.log("🚀 ~ file: AuthController.js ~ line 18 ~ login ~ foundUser", foundUser)
    if (foundUser.length === 0) return res.status(401).json({ message: 'UNAUTHORIZED!' })
    const match = await bcrypt.compare(password, foundUser[0].password)
    if (!match) return res.status(401).json({ message: 'UNAUTHORIZED!!!' })

    const accessToken = jwt.sign({
            "id": foundUser[0].id,
            "username": foundUser[0].username
        },
        process.env.ACCTOKENSECRET,
        { expiresIn: '5m' }
    )

    const refreshToken = jwt.sign(
        { "id": foundUser[0].id, "username": foundUser[0].username },
        process.env.REFTOKENSECRET,
        { expiresIn: '1d' }
    )
console.log('SECURE ', process.env.COOKIESECURE )
    //** CREATE SECURE COOKIE WITH REFRESH TOKEN 
    res.cookie(process.env.COOKIENAME, refreshToken, {
        httpOnly: true,                     //? accessible only by web server 
        //sameSite: 'None',                   //? cross-site cookie 
        maxAge: 24 * 60 * 60 * 1000,        //? cookie expiry: set to match rT
        secure: process.env.COOKIESECURE    //? http false, https true
    })

    //** SEND ACCESTOKEN CONTAINING userName AND roles
    res.json({ accessToken })
})

/**
** @desc    Refresh
** @route   GET /auth/refresh
** @access  Public - because access token has expired
*/
const refresh = (req, res) => {
    const cookies = req?.cookies
    const { table } = {table: "users"}
    console.log("🚀 ~ file: AuthController.js ~ line 67 ~ refresh ~ cookies", cookies)
    if (!cookies?.Recipes) return res.status(401).json({ message: 'Unauthorizedrefresh' })
    const refreshToken = cookies.Recipes
    console.log("🚀 ~ file: AuthController.js ~ line 69 ~ refresh ~ refreshToken", refreshToken)

    jwt.verify(refreshToken, process.env.REFTOKENSECRET, asyncHandler(async (err, decoded) => {
        if (err) return res.status(403).json({ message: 'FORBIDDEN!' })
        const foundUser = await services.getDataFromDb({base: table}, { id: decoded.id })
        if (foundUser.length === 0) return res.status(401).json({ message: 'UNAUTHORIZED!' })
        const accessToken = jwt.sign({
                "id": foundUser[0].id,
                "username": foundUser[0].username
            },
            process.env.ACCTOKENSECRET,
            { expiresIn: '5m' }
        )
        res.json({ accessToken })
    }))
}

/**
** @desc    Logout
** @route   POST /auth/logout
** @access  Public - just to clear cookie if exists
*/
const logout = (req, res) => {
    console.log('LOGOUT')
    const cookies = req?.cookies
    console.log("🚀 ~ file: AuthController.js ~ line 95 ~ logout ~ cookies", cookies)

    if (!cookies?.Recipes) return res.status(204).json({ message: 'NO COOKIE!' }) //?  NO CONTENT
    res.clearCookie(process.env.COOKIENAME)
    console.log(3)
    res.cookie(process.env.COOKIENAME, {maxAge: 0,})
    console.log(4)
    res.status(204).json({ message: 'COOKIE CLEARED!' })
    console.log(5)
}

module.exports = {
    login,
    refresh,
    logout
}
