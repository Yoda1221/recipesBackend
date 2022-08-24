const cors      = require('cors')
const http      = require('http')
const colors    = require('colors')
const express   = require('express')
const dotenv    = require('dotenv').config()
const errorHandler  = require('./middlewares/ErrorHandler')
const { logEvents, logger } = require('./middlewares/Logger')

const app       = express()
const httpServer = http.createServer(app)
const PORT = process.env.PORT || 4001

app.use(logger)
app.use(errorHandler)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api',     require('./routes/routes'))
app.use('/users',   require('./routes/userRoutes.js'))
app.use('/recipes', require('./routes/recipeRoutes.js'))

app.all('*', (req, res) => {
    res.status(404)
    /* if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else  */
    if (req.accepts('json')) {
        res.json({message: '404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }
})

httpServer.listen( PORT, () => {
    logEvents(`SERVER IS RUNNING ON PORT: ${PORT}`, 'serverRunLog.txt')
    console.log(`\n\n|-O-|\n\nSERVER IS RUNNING ON PORT:\t${PORT.yellow}\t${colors.cyan(new Date())}`.gray)
})