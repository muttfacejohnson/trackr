var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var userSchema = new Schema({
	username: String,
	kd: Number,
	rank: Number,
	trackerurl: String,
	wins: Number,
	losses: Number
});

module.exports = mongoose.model("User", userSchema);