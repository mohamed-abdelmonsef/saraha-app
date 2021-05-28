const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
    email :String,
    path : String
})

module.exports = mongoose.model('profile' ,profileSchema )