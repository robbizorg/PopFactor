mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	userID: String,
	userName: String,
	data: Object
})

mongoose.model('User', UserSchema);