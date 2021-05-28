const express = require('express')
const app = express()
const path = require('path')
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')
app.use(express.urlencoded({ extended:false }))
const mongoose = require('mongoose')
var session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore({
    uri: 'mongodb+srv://admin:admin@cluster0.srnvy.mongodb.net/saraha',
    collection: 'mySessions'
  });

var flash = require('connect-flash');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store
  })) 

app.use(flash())
app.use(require('./routes/index.routes'))
app.use(require('./routes/register.routes'))
app.use(require('./routes/login.routes'))
app.use(require('./routes/user.routes'))
var multer  = require('multer')
var storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    cb(null, 'uploads')
  },
  filename: (req, file, cb)=> {
    cb(null, Date.now()+Math.random() + file.originalname)
  }
})
function fileFilter (req, file, cb) {
  if (file.mimetype =='image/png'||file.mimetype =='image/jpg'||file.mimetype =='image/jpeg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}
var upload = multer({ dest: 'uploads' ,storage ,fileFilter })
app.use(upload.single("file"))

app.use(require('./routes/messages.routes'))
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.get('*',(req,res)=>{
  res.send('404 page not found')
 })

mongoose.connect('mongodb+srv://admin:admin@cluster0.srnvy.mongodb.net/saraha' ,
{useNewUrlParser:true ,useUnifiedTopology:true,useFindAndModify:false }).then(()=>{
    console.log('db is connected');
}).catch(()=>{
    console.log('db EROOOOR');
})
app.listen(process.env.PORT || 3000,()=>{
  console.log('SERVER IS WORKING');
})