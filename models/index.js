var mongoose  = require('mongoose')
	, config  = require('../config').config;

mongoose.connect(config.database_path , function(err){
	if (err) {
		console.log('Connect Database Error! : ' + err.message);
		process.exit(1);
	}
});

// models
exports.Article = require('./article').Article;
exports.User = require('./user').User;