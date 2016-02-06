mongoose = require('mongoose');

var AccessSchema = new mongoose.Schema({
	accessToken: String
})

mongoose.model('Access', AccessSchema);