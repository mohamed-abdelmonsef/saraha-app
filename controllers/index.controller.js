


module.exports.mainIndex = (req,res)=>{
    res.render('index' ,{isLogged : req.session.isLoggedin})
}

