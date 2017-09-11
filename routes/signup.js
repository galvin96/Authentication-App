var express = require('express');
var router = express.Router();

var fs = require('fs');
// Thêm tính năng kiểm tra tạo tài khoản đã có trong file user.json hay chưa

router.get('/', function(req, res, next){
	res.render('signup');
});

router.post('/', function(req, res, next){
	var signupForm = req.body;

	var newData = {
		"id": String(signupForm.name),
		"pwd": String(signupForm.password)
	};

	var filePath = fs.readFileSync('routes/user.json');
	var data_ = JSON.parse(filePath);
	for (var i=0; i< data_.length; i++){
		if (newData.id === data_[i].id) break;
	}
	if (i != data_.length){
		res.render('signup', {Alert: 'Username is existed!'});
	}
	else{
		appendObject(JSON.stringify(newData));
		req.session.authenticated = true;
		req.session.user = signupForm.name;
		res.redirect('/');
	}
});

function appendObject(newData){
	var filePath = fs.readFileSync('routes/user.json');
	var data_ = JSON.parse(filePath);
	data_.push(JSON.parse(newData));
	var dataJson = JSON.stringify(data_);
	fs.writeFileSync('routes/user.json', dataJson);
}

module.exports = router;
