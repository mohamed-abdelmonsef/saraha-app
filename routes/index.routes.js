const app = require('express').Router()
const indexController = require('../controllers/index.controller')

try {
    app.get('/',indexController.mainIndex)    
} catch (error) {
    console.log('an error in index route',error);
}

module.exports = app