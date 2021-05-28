const app = require('express').Router()
const userController = require('../controllers/user.controller')


try {
    app.get('/user/:id', userController.renderUser)
} catch (error) {
    console.log('an error in user route',error);
}

try {
    app.post('/handleUser',userController.handleUser)
} catch (error) {
    console.log('an error in handling user',error);
}

module.exports = app
