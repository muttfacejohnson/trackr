var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var userSchema = new Schema({
	name: String,
	kdr: Number,
	wins: Number,
	losses: String,
	kills: Number,
	deaths: Number,
	headShots: Number,
	longestHeadShot: Number
});

module.exports = mongoose.model("User", userSchema);