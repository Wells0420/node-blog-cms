var config = require('../config').config
	, fs = require('fs')
	, article = require('./article')
	, models = require('../models')
	, async = require('async');

exports.admin = function (req, res) {

	var username = req.session.username ? req.session.username : null ;

	!username ? res.render('login',{config:config,admin:true}) : function(){
		res.render('dash_dashboard',{ config : config , username : req.session.username });
	}();
}

exports.siteOption = function (req, res) {
	var options = {
		site_name 			:req.body.site_name
		, site_author 		:req.body.meta_author
		, site_keywords 	:req.body.meta_keywords
		, site_description 	:req.body.meta_description
	};

	async.waterfall([
		function ( callback) {
			config.site_name		= options.site_name;
			config.site_author		= options.site_author;
			config.site_keywords	= options.site_keywords;
			config.site_description	= options.site_description;

			return callback(null, config);
		},
		function (config, callback){
			fs.writeFile('./config.json', JSON.stringify(config), function (err){
				if (err) throw err;
				return callback({success:true});
			});
		}
	],function (err, result) {
		if (err) console.log(err);
		res.redirect('/siteoption');
	});
}

exports.renderArticleList = function (req, res) {
	async.waterfall([
		function (callback){
			models.Article.find({},function (err, data){
				if (err) throw err ;
				return callback(null, data);
			});
		}
	],function (err,result) {
		res.render('dash_articleList',{articles:result});
	});
}

exports.renderArticleEdit = function(req, res){
	var aid = req.param('id');
	async.waterfall([
		function (callback){
			models.Article.findOne({'_id': aid},{},function (err,data){
				if (err) throw err ;
				return callback(null,data);
			});
		}
	],function (err, result){
		console.log(result);
		if (err) throw err ;
		res.render('article_editer',{article:result});
	});
}
