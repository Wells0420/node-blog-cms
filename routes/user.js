
var models 		= require('../models')
	, util		= require('./util')
	, async 	= require('async')
	, User 		= models.User
	, config	= require('../config').config;

exports.sign = function (req, res){
	res.render('sign',{config:config});
}

exports.loginrender = function(req, res){
	res.render('login',{config:config});
}


exports.signup = function(req, res){	
	var Reg_email 		= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
		, Reg_password 	= /^\w+$/
		, useremail 	= req.body.useremail
		, password 		= req.body.password
		, checked 		= Reg_email.test(useremail) && Reg_password.test(password);

	async.waterfall([
		function (callback){
			if (checked) {
				User.findOne({'userEmail': useremail},{},function (err, data){
					return callback (null, data);
				});
			} else {
				res.json({err:'邮箱格式不正确'});
			}
		},
		function (result, callback){			
			if (!result) {
				var user = new User({
					userEmail 	: useremail
					, password 	: password
				});
				user.save(function(err){
					if (err) console.log(err);
					return callback(null, true);
				});
			} else {
				res.json({email:'邮箱被占用'});
			}
		}
	],function (err,result){
		if (result) {
			req.session.useremail = useremail;
			res.redirect('/');
		}
	});
}

exports.login = function(req, res){
	var useremail 		= req.body.useremail
		, password 		= req.body.password
		, admin		 	= req.body.admin
		, renderlogin 	= function(){
			res.render('login',{config : config , err: false});
		};

	User.findOne({'userEmail': useremail},{},function (err, result){
		if(err) console.log(err);
		if (result) {
			if (useremail == result.userEmail && password == result.password ) {
				req.session.username = useremail;
				if (admin) {
					res.redirect('/admin');
				}else{
					res.redirect('/');
				}
			} else {
				renderlogin();
			}
		} else {
			renderlogin();
		}
	});
}

exports.logout = function(req, res){
	req.session.username = null;
	res.redirect('/');
}


/*
 * return : 返回该邮箱是否已经被注册
 */
exports.AJAX_signup_checkin = function(req, res){
	var useremail 	= req.query.useremail;
	User.findOne({'userEmail': useremail},{},function (err, result){
		if(err) console.log(err);
		checked = result === null ? true : false;
		res.json({cansignin:checked});
	});
}






