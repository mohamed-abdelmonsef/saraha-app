const messageModel = require('../models/message.model')
const userModel = require('../models/user.model')



let _Id
module.exports.renderUser = async(req,res)=>{
    _Id = req.params.id
    let shareLink =  req.protocol +"://" +req.headers.host+"/user/"+req.session._id
    let user = await userModel.findOne({_id : _Id})
    res.render('user' ,{name:user.name ,isLogged : req.session.isLoggedin,shareLink})
}

module.exports.handleUser = async(req,res)=>{
    const {message} = req.body
        await messageModel.insertMany({message ,_Id})
        res.redirect('/user/' + _Id)

} 
