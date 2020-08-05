const express = require("express"),
      app = express(),
      bodyParser= require("body-parser"),
      mongoose = require("mongoose"),
      methodOverride = require("method-override"),
      expressSanitizer = require("express-sanitizer");
      campgrounds = require("./models/campground.js")
      comments = require("./models/comment")
      seed = require("./seeds.js")

//It remove Data
//seed();
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('Public'))
app.use(methodOverride("_method"))
app.use(expressSanitizer())
// Database Schema
let url = `mongodb+srv://TechhUser:<passowrd>@techhcluster.7lflw.mongodb.net/<DB>?retryWrites=true&w=majority`
mongoose.connect(url,
	{
	   useNewUrlParser:true,
	   useUnifiedTopology:true,
     useFindAndModify:false
	},
	(err)=>{
	if(err) console.log(`++++++++++++++++${err}`);
    else{
       console.log(`++++++++++database connecteed+++++++++++++++`)
     }
})


// redirect to /blog
app.get("/",(req,res)=>{
 res.redirect("/blog")
})
app.get("/blog",(req,res)=>{
	campgrounds.find({},(err,allcampground)=>{
       if(err) console.log(err)
       else{
       	res.render('index',{campgrounds:allcampground})
       }
	})
})



// redirect to /log/new for Create
app.get("/blog/new",(req,res)=>{
   res.render("new")
})
app.post("/blog",(req,res)=>{
 campgrounds.create({
     name:req.body.name,
     image:req.body.image,
     desc:req.body.desc
   },(err,newBlog)=>{
    if(err){ 
     res.render("new");
    }else{
     res.redirect("/blog");
    }
 })
})


// Read More
app.get("/show/:id",(req,res,next)=>{

 // campgrounds.findById(req.params.id,(req,res)=>{
 //  res.render("show") 
 // })
 campgrounds.findById(req.params.id)
 	 .populate('comments')
   .exec()
   .then(campgrounds=>{
      res.render("show",{blog:campgrounds}) 
   })
   .catch(err=> console.log(err));
})


app.get("/show/:id/edit",(req,res)=>{
   campgrounds.findById(req.params.id,(err,foundBlog)=>{
     if(err) res.redirect("/show/:id");
     else{
 	   res.render("edit",{blog:foundBlog})
     }
   })  
})


// delete
app.delete("/show/:id/delete",(req,res)=>{
   campgrounds.findByIdAndRemove(req.params.id,(err)=>{
     if(err) console.log(err);
     else { 
     	console.log("deleted")
     	res.redirect(`/blog`)
     }
   })
})

// update
app.put("/show/:id/update",(req,res)=>{
	//campground.findByIdAndUpgrade(id,newData,callback)
   campgrounds.findByIdAndUpdate(req.params.id,{
   	    name:req.body.name,
   	    image:req.body.image,
   	    desc:req.body.desc
   	    },(err,blog)=>{ 
          if(err) console.log(err)
          else res.redirect(`/show/${req.params.id}`)
   	    }
  )
})

const port = process.env.Port || 3000 
app.listen(port,()=>{
	console.log(`Listening at Port ${port}`);
})
