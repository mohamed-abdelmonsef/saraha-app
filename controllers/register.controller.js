const userModel = require('../models/user.model')
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const profileModel = require('../models/profile.model')
const nodemailer = require("nodemailer");
var jwt = require('jsonwebtoken');
let transporter = nodemailer.createTransport({
    service :"outlook" ,
    auth: {
      user: "fofofoco@outlook.com",
      pass: "cofofofo11",
    },
  });

module.exports.renderRegister = (req,res)=>{
    res.render('register' ,{validErrors :req.flash('validationErrors') 
    ,oldInputs:req.flash('oldInputs') ,exist:req.flash('exist') 
    ,isLogged : req.session.isLoggedin})
}


module.exports.handleRegister = async(req,res)=>{
    const {name ,email ,password} = req.body
    let errors = validationResult(req)
    if (errors.isEmpty()) {
        let user = await userModel.findOne({email})
        if (user) {
            //feedback tell user this email is already exist
            req.flash('exist' ,true)
            res.redirect('/register')
        } else {
            //insert into db
            bcrypt.hash(password ,7 ,async(err,hash)=>{
                var token = jwt.sign({ email }, 'hamo');
                let options ={
                    from: '"node js team" <fofofoco@outlook.com>', // sender address
                    to: email, // list of receivers
                    subject: "Hello ✔", // Subject line
                    html: `
                        <div style="background-color:#bbf;color:red;padding:140px">
                            <h1><b>Verify your email ...<br><a href="https://moon-saraha.herokuapp.com/check/${token}"> click here to confirm your email</a></h1>
                        </div>`
                  }
                await transporter.sendMail(options,(nodemailer_err)=>{
                    if (nodemailer_err) {
                        console.log(nodemailer_err);
                    } else {
                        console.log('email has been sent');
                    }
                });
                await userModel.insertMany({name,email,password:hash})
            })
            await profileModel.insertMany({email,path :'/img/avatar.png'})    
            res.redirect('/messages')
        }
        
    } else {
        //feedback tell user to input valid data
        req.flash('validationErrors' ,errors.array())
        req.flash('oldInputs' ,{name ,email ,password})
        res.redirect('/register')
    }
}


module.exports.checkVerification = (req,res)=>{
    let token = req.params.token
    
    jwt.verify(token, 'hamo',async function(err, decoded) {
        await userModel.findOneAndUpdate({email:decoded.email},{confirmed:true})
      });
    res.redirect('/login')
}
