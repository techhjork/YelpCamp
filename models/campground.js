const mongoose = require("mongoose");
const campgroundSchema = new mongoose.Schema({
	name:{
		type:String,
		max:255,
		min:3,
        required:["true","name is Compulsory"]
	},
	image:{
		type:String,
		required:["true","Image Link is Compulsory"]
	},
	desc:{
		type:String,
		required:["true","description is compulsory"]
	},
	date:{
		type:Date,
		default:Date.now
	},
	Comment:[
    {
    	type:mongoose.Schema.Types.ObjectId,
    	ref:"comment"
    }
	]
})
module.exports = mongoose.model("campground",campgroundSchema)
