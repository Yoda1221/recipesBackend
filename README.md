# Recipe Project BackEnd

## User Stories for techNotes

1.  [ ] Replace current sticky note system


## Start Project
- npm init -y
- npm i express date-fns uuid cookie-parser cors colors moment mysql
- npm i express-async-handler bcrypt dotenv express-fileupload
- npm i nodemon -D

## Create folders (MacOSX Teminal)
- md config controllers middlewares routes services public 

## Create files (MacOSX Teminal)
- touch index.js .gitignore .env.example
- touch services/methods.js config/mysqlConn.js
- touch middlewares/logger.js middlewares/ErrorHandler.js
- touch routes/routes.js routes/userRoutes.js routes/recipeRoutes.js 
- touch controllers/usersController.js controllers/recipeController.js 
