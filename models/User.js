mongoose = require('mongoose');

var AccessSchema = new mongoose.Schema({
	userID: String,
	data: Object
})

mongoose.model('User', UserSchema);