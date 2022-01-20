const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session')
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const app = express();

app.set("view engine","ejs")
app.use(bodyParser.urlencoded({ extended: true}));

mongoose.connect('mongodb://localhost:27017/StudentDB');

app.use(session({
  secret: 'Gate pass for all',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
// app. id is false and if we got the jjnl
app.use(passport.initialize());
app.use(passport.session());


const UserSchema = new mongoose.Schema({
  name:String,
  password:String
});
UserSchema.plugin(passportLocalMongoose);

const Student= new mongoose.model("Student",UserSchema);
passport.use(Student.createStrategy());

passport.serializeUser(Student.serializeUser());
passport.deserializeUser(Student.deserializeUser());


app.get("/",(req,res)=>{
  // var newDate = Date();
  // res.render("index" ,{date:newDate});
  res.render("main")
});
app.get("/index",(req,res)=>{
  console.log(req.isAuthenticated());
  //
  // if(){
  //   res.render("index");
  // }else{
  //   res.send("hii")
  // }

});
app.get("/login",(req,res)=>{
  res.render("login")
});
app.get("/register",(req,res)=>{
  res.render("register")
});

app.post("/register", function(req, res){

  User.register({username: req.body.email}, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/index");
      });
    }
  });

});

app.post("/login",(req,res)=>{
  const student = new Student({
    username:req.body.email,
    password:req.body.password
  });
  req.login(student,function(err){
    if(err){
      console.log(err);
    }else {
      passport.authenticate("local")(req, res, function(){
        console.log("hiii");
        res.redirect("/index");
      });
    }
  })
});

app.post("/gaurd",(req,res)=>{
  const details = {
    roll :req.body.RollNumber,
    name :req.body.Name,
    date:req.body.date

  };
res.render("gaurd",{details:details})

});






app.listen(3000,(err)=>{
  console.log("Serer is running at port 3000");
});
