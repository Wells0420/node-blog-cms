var fs 			= require('fs');

var config 		= fs.readFileSync('./config.json');

exports.config 	= JSON.parse(config);
