const express = require("express"),
      mongoose = require("mongoose"),
      passport = require("passport"),
      LocalStrategy = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose"),
      bodyParser = require("body-parser"),
      app = express();

let url = `mongodb+srv://TechhUser:TechhPass@techhcluster.7lflw.mongodb.net/TechhDB?retryWrites=true&w=majority`
mongoose.connect(url,
{
   useNewUrlParser:true,
   useUnifiedTopology:true
}
,function(err){
	if(err) throw err;
	else console.log("connected database")
})
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(passport.initialize());
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
//userSchema
const userSchema = new mongoose.Schema({
	username:String,
	password:String
})
userSchema.plugin(passportLocalMongoose)
const User = mongoose.model("authuser",userSchema)

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
passport.use(new LocalStrategy(User.authenticate()))

app.get("/",function(req,res){
	res.render("authhome.ejs")
})
app.get("/register",function(req,res){
	res.render("authregister.ejs")
})
app.post("/register",function(req,res){
     User.register(new User({username:req.body.username}), req.body.password ,(err,user)=>{
           if(err){
            console.log(err)
           }  
           passport.authenticate('local')(req,res,function(){          
           	 res.redirect("/secret")
           })       	

     })
      
})




app.get("/login",function(req,res){
	res.render("authlogin.ejs")
})
app.post("/login",passport.authenticate('local',{
	successRedirect:'/secret',
	failureRedirect:'/login'
}),(req,res)=>{})


app.get("/logout",function(req,res){
	res.render("authlogout.ejs")
})
app.get("/secret",isLoggedIn,function(req,res){
	res.render("authsecret.ejs")
})

app.get('/logout',(req,res)=>{
 res.logout()
 res.redirect("/")
})


function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next()
	}
	res.redirect("/login")
}
const port = process.env.PORT || 3000
app.listen(port,function(err){
 if(err) throw err;
 else console.log("connected.......")
})