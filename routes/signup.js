var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var fs = require('fs');

router.get('/', function(req, res, next){
	res.render('signup');
});

router.post('/', function(req, res, next){
	var signupForm = req.body;
	mongoose.model('userDb').findOne({ username : signupForm.name}, function(err, user){
		if (!user) {
			mongoose.model('userDb').create({
				username : signupForm.name,
				password : signupForm.password
			}), function (err, users){
				if (err) {
					console.log('There was a problem adding the information to the database.');
				}
				else {
					console.log('POST creating new user: ', user);
				}
			}
			req.session.authenticated = true;
			req.session.user = signupForm.name;
			res.redirect('/');
		}
		else {
			res.render('signup', {Alert: 'Username was existed.'});
		}
	});
});

module.exports = router;
