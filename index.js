const cors          = require('cors')
const http          = require('http')
const colors        = require('colors')
const express       = require('express')
const cookieParser  = require('cookie-parser')
const dotenv        = require('dotenv').config()
const fileUpload    = require('express-fileupload')
const corsOptions   = require('./config/corsOptions')
const errorHandler  = require('./middlewares/ErrorHandler')
const { logEvents, logger } = require('./middlewares/Logger')

const app           = express()
const httpServer    = http.createServer(app)
const PORT          = process.env.PORT || 4001

app.use(logger)
app.use(errorHandler)
app.use(cors(corsOptions))
app.use(fileUpload())
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))

app.use('/',        require('./routes/routes'))
app.use('/users',   require('./routes/userRoutes.js'))
//app.use('/api',     require('./routes/routes'))
//app.use('/auth',    require('./routes/authRoutes.js'))
//app.use('/recipes', require('./routes/recipeRoutes.js'))

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
