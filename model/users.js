
var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('userDb', userSchema);