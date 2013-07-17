// article models 
var moment = require('moment')
	, mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, ArticleSchema = new Schema ({
		title		: String
		, content	: String
		, userID	: {type: String, default: ''}
		, auther	: {type: String, default: ''}		
		, className	: {type: String, default: ''}
		, tagName 	: {type: String, default: ''}
		, createTime: {type: Date, default: Date.now}
	});

exports.Article = mongoose.model('Article',ArticleSchema);