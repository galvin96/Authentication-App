var express = require('express');
var router = express.Router();

/* GET home page. */

router.post('/', function(req, res){
	if (req.session.authenticated === true){
		req.session.authenticated= false;
		res.redirect('/');
		console.log('remove authenticated, direct to index');
	}
	else {
		res.redirect('/login');
		console.log('direct to login');
	}
});

router.get('/', function(req, res) {
	if (req.session.authenticated === true){
		res.render('index', { 
			authenticated: true, 
			title: req.session.user, 
			typeButton: 'Sign Out',
		});
	}
	else {
		res.render('index', { 
			authenticated: false, 
			title: 'Guest', 
			typeButton: 'Login',
		});
	}
});

module.exports = router;
