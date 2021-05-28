const {check} = require('express-validator')

module.exports = [
    check('message').matches(/^[a-zA-Z ]{2,30}$/),
]