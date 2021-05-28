const app = require('express').Router()
const auth = require('../middleware/home.auth')
const messagesController = require('../controllers/messages.controller')



try {
    app.get('/messages' ,auth ,messagesController.renderMessages)
    app.get('/logout' ,messagesController.logOut)
    app.post('/handleProfile',messagesController.changePic)
} catch (error) {
    console.log('an error in messages route' ,error);
}

module.exports = app