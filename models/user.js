var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, UserSchema = new Schema({
		userEmail   : String
		, password 	: String
		, userClass : { type:Number, default:5 }
		, userName  : { type:String, default:'徐骁一' }
	}); 

exports.User = mongoose.model('User' , UserSchema);