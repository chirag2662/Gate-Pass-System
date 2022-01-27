const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require('passport');
require('./auth');
mongoose.connect("mongodb+srv://chirag:"+process.env.MONGO_PASSWORD+"@cluster0.7n70t.mongodb.net/studentDB")
const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
   //     <-----    login    ----->
   function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.use(session({
  secret: 'Gate pass System',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//   <----- Database ------>

const studentSchema = {
  SNo:Number,
  GId:String,
  name: String,
  email:String,
  RollNumber:String,
  room:String,
  date:String,
  LReason:String
}

const Student = mongoose.model("student",studentSchema);

app.get('/', (req, res) => {
  res.render("main")
});

app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['email', 'profile']
  }));

app.get('/login/google',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure'
  })
);

app.get('/protected', isLoggedIn, (req, res) => {
  var mail = req.user._json.domain;

  if (mail == 'iitbbs.ac.in') {
    res.render("index", {
      user: req.user
    });


  } else {
    res.send("Please log in with IIT Bhubaeswar ID")
  }



});

app.post('/submit', (req, res) => {
  Student.find({},(err,result)=>{

  const student = new Student({
    SNo:result.length+1,
    GId:req.user.id,
    name: req.user.displayName,
    email:req.user.email,
    RollNumber:req.body.roll,
    room:req.body.room,
    date:req.body.date,
    LReason:req.body.reason
  });
  student.save();
});


  res.send("GatePass Requested submitted succesfully");
});

app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate.');
});



app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
