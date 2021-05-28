const userModel = require('../models/user.model');
const bcrypt = require('bcrypt')


module.exports.renderLogin = (req,res)=>{
    res.render('login' ,{exist:req.flash('exist'),confirm:req.flash('confirm') 
    ,wrongPass:req.flash('wrongPass') ,isLogged :req.session.isLoggedin})
}


module.exports.handleLogin = async(req,res)=>{
    const {email , password} = req.body
    let user = await userModel.findOne({email})
    if (user == null) {
        //feedback message say this email doesn't exist
        req.flash('exist' ,{email})
        res.redirect('/login')

    } else {
        //check password
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            //check if user confirmed the email or not
            if (user.confirmed == false) {
                req.flash('confirm',true)
                res.redirect('/login')
            } else {
             //make session
            req.session.name = user.name
            req.session._id = user._id
            req.session.email = user.email
            req.session.isLoggedin = true
            res.redirect('/messages')
        }
        // }
        } else {
            //feedback say the password is wrong
            req.flash('wrongPass',{password})
            res.redirect('/login')
        }
    }
}