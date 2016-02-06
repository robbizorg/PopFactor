mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	userID: String,
	data: Object
})

mongoose.model('User', UserSchema);