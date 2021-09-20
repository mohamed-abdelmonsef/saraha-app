const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name : String,
    email : String,
    password : String,
    profileUrl : String,
    confirmed : {type : Boolean , default : true }
})

module.exports = mongoose.model('user',userSchema)
