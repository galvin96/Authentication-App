var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var fs = require('fs');

router.post('/', function(req, res, next){
	var loginForm = req.body;
	var authenticated = false;
	req.session.message='';
	req.session.error= false;
	mongoose.model('userDb').findOne({ username : loginForm.name}, function(err, user){
		if (user){
			authenticated= true;
			req.session.authenticated= true;
			req.session.user= loginForm.name;
			res.redirect('/');
		}
		else{
			req.session.message='Username and password are incorrect!';
			req.session.error=true;
			res.redirect('/login');
		}
	});
});

router.get('/', function(req, res, next){
	if (!req.session.authenticated){
		res.render('login', { mess: req.session.message, error: req.session.error});
	}
});

module.exports = router;
