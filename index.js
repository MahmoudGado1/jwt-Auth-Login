const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser');
const  requireAuth  = require('./middleware/authMiddleware');
const checkUser = require('./middleware/authMiddleware');

const app = express();
const port = process.env.PORT || 3000;
// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser())
// view engine
app.set('view engine', 'ejs');


// database connection
// const dbURI = 'mongodb://127.0.0.1:27017/node-auth';
const dbURI = 'mongodb+srv://mahmoud:Mahmoud21-00930@cluster1.ko5lkno.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true })
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));

// routes
app.get('*',checkUser)
app.get('/',(req, res) => res.render('home'));
app.get('/smoothies',requireAuth,(req, res) => res.render('smoothies'));

app.use(authRoutes)

// cookies

// app.get('/set-cookies', (req, res) => {
//   // res.setHeader('Set-Cookie', 'newUser=true')
//   res.cookie('newUser', false) 
//   // secure: true for https only and don't show in cookies
//   // res.cookie('isEployee',true, {maxAge: 1000*60*60*24, secure: true})
//   // httpOnly: true can not be accessed by javascript
//   //This enhances security by preventing cross-site scripting (XSS) attacks.
//   res.cookie('isEployee',true, {maxAge: 1000*60*60*24, httpOnly: true})
//   res.send('you got the cookie')
// })
// app.get('/read-cookies', (req, res) => {
//   const cookies = req.cookies
//   console.log(cookies)
//   res.json(cookies)
// })