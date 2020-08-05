const mongoose = require("mongoose"),
      campgrounds = require("./models/campground.js"),
      comment = require("./models/comment.js");
var data =[
 {
 	name:"Ram",
 	image:"https://images.unsplash.com/photo-1595023890460-dfcbd447cfc3?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
 	desc:"this is ram",
 },
  {
 	name:"shyam",
 	image:"https://images.unsplash.com/photo-1593987570330-00685ca3132a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
 	desc:"this is shyam",
 },
  {
 	name:"Rohan",
 	image:"https://images.unsplash.com/photo-1595970487273-c635a1eaa8b8?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
 	desc:"this is Rohan",
 },
  {
 	name:"sohan",
 	image:"https://images.unsplash.com/photo-1595455967349-d254c74cf693?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
 	desc:"this is sohan",
 },
  {
 	name:"vagina",
 	image:"https://images.unsplash.com/photo-1595993737534-88538ec8fd40?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
 	desc:"this is vagina",
 },
  {
 	name:"vegan",
 	image:"https://images.unsplash.com/photo-1595455967349-d254c74cf693?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
 	desc:"this is vegan",
 }
]
function seedDB(){
	//remove campground
	campgrounds.remove({},(err)=>{
	 if(err) console.log(err);
	 else console.log("data Removed")
	})
    comment.remove({},(err)=>{
      if(err) console.log(err);
	 else console.log("comment Removed")   
    })
	//Add New campground
	data.forEach(seed=>{
     campgrounds.create(seed,(err,campground)=>{
        if(err) console.log(err);
        else{
         console.log("added")
         comment.create({
          text:"This is comment",
          author:"Colt Steele"
         },(err,comment)=>{
             if(err) console.log(err);
             else {
             	campground.Comment.push(comment);
             	campground.save((err)=>{
                  if(err) console.log(err);
                  else console.log("comment saved " + campground.comments)
             	})
             }
         })
        }
     })
	}) 
}
module.exports = seedDB