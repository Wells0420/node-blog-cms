
/*
 * GET home page.
 */
var config = require('../config').config
	, article = require('./article')
	, models = require('../models')
	, moment = require('moment');



exports.index = function(req, res){
	models.Article.find({},{},{sort: [['_id', -1]]},function (err, result){
		res.render('index', { 
			blog_name			: config.site_name
			, blog_description 	: config.site_description
			, articles 			: result
			, username			: req.session.username
		});
	});
};

exports.dashboard = require('./dashboard');
exports.article = require('./article');
exports.user = require('./user');
