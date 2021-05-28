const { findOne } = require('../models/message.model')
const messageModel = require('../models/message.model')
const profileModel = require('../models/profile.model')




module.exports.renderMessages = async(req,res)=>{
    let messages = await messageModel.find({_Id : req.session._id})
    let shareLink =  req.protocol +"://" +req.headers.host+"/user/"+req.session._id
    let profilePic = await profileModel.findOne({email :req.session.email})
    res.render('messages',{name:req.session.name,shareLink ,messages 
    ,isLogged : req.session.isLoggedin,profilePic})
}

module.exports.changePic = async(req,res)=>{
    if (req.file==undefined) {
        res.redirect('/messages')
    } else {
        await profileModel.findOneAndUpdate({email :req.session.email},{path:req.file.path})
        res.redirect('/messages')
    }
  }


module.exports.logOut = (req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
}