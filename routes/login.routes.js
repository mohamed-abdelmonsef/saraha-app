const app = require('express').Router()
const auth = require('../middleware/login.auth')
const loginController = require('../controllers/login.controller')

try {
    app.get('/login' ,auth ,loginController.renderLogin)
} catch (error) {
   console.log('an error in login route' ,error); 
}

try {
    app.post('/handleLogin',loginController.handleLogin)
} catch (error) {
    console.log('an error in handling login',error);
}

module.exports = app