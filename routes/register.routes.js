const app = require('./index.routes')
const validation = require('../validators/register.validation')
const registerController = require('../controllers/register.controller')

try {
    app.get('/register',registerController.renderRegister)
} catch (error) {
    console.log('an error in register route' ,error);
}

try {
    app.post('/handleRegister' ,validation ,registerController.handleRegister)
    app.get('/check/:token',registerController.checkVerification)
} catch (error) {
    console.log('an error in handling the form',error);
}

module.exports = app