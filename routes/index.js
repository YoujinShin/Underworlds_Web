
/*
 * routes/index.js
 * 
 * Routes contains the functions (callbacks) associated with request urls.
 */

var request = require('request'); // library to make requests to remote urls
var moment = require("moment"); // date manipulation library


exports.index = function(req, res) {
	console.log('main page requested');
	// es.render('index_new.html');
	res.render('index3.html');
	// res.render('main.html');
}

exports.design = function(req, res) {
	console.log('main page requested');
	res.render('index_new.html');
	// res.render('index3.html');
	// res.render('main.html');
}

exports.viz1 = function(req, res) {
	console.log('viz1 page requested');
	res.render('viz1.html');
	// res.render('main.html');
}

exports.virus = function(req, res) {
	console.log('virus page requested');
	res.render('virus.html');
	// res.render('main.html');
}