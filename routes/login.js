var express = require('express');
var router = express.Router();

var fs = require('fs');
var userArr;

fs.readFile('routes/user.json', 'utf8', function(err, data){
	if (err) throw err;
	userArr = JSON.parse(data);
});

router.post('/', function(req, res, next){
	var loginForm = req.body;
	var authenticated = false;
	req.session.message='';
	req.session.error= false;
	for (var i=0; i< userArr.length; i++){
		if ((loginForm.name === userArr[i].id) && (loginForm.password === userArr[i].pwd)){
			authenticated= true;
			req.session.authenticated= true;
			req.session.user= loginForm.name;
			res.redirect('/');
			break;
		}
	}
	if (!authenticated){
		req.session.message='Username and password are incorrect!';
		req.session.error=true;
		res.redirect('/login');
	}
});

router.get('/', function(req, res, next){
	if (!req.session.authenticated){
		res.render('login', { mess: req.session.message, error: req.session.error});
	}
});

module.exports = router;
