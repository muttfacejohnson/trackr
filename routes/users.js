var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var axios = require('axios');
let User = require('../models/user');
mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://localhost:27017/Dev")

/* GET users listing. */
router.get('/', function(req, res) {
	User.find({}).then(function(users){
		let userMap = {};
		let headers = null;

		users.forEach(function(user){
			if(headers == null){
				headers = Object.keys(user);
			}
			userMap[user.id] = user;
		});

		res.render('users', {user: userMap, headers: [
			// 'ID',
			'Name',
			'K/D',
			'Kills',
			'Deaths',
			'Wins',
			'Losses',
			'Headshots',
			'Longest Headshot'
		]});
		
	});
});

/**
 * Used to get user information for a user
 */
router.get('/:username', function (req, res) {
    var username = req.params.username;

    if(!username){
        res.send();
    }

	User.find({name: username}).then(function(users){
		if(users.length > 0){
			res.json(users.pop());
		}
		else{
			var platform = '3',
			game = 'tunguska';
			
			const url = 'https://battlefieldtracker.com/bf1/api/Stats/DetailedStats?platform='+platform+'&displayName='+username+'&game='+game;
			let config ={
				headers: { 'TRN-Api-Key' : 'e9fac43d-764a-4b5e-a20d-acd05e12ada5' }
			}
			axios.get(url, config).then(function(result){
				let stats = result.data.result;
				var user = new User({
					name: username,
					kdr: stats.kdr,
					wins: stats.basicStats.wins,
					losses: stats.basicStats.losses,
					kills: stats.basicStats.kills,
					deaths: stats.basicStats.deaths,
					headShots: stats.headShots,
					longestHeadShot: stats.longestHeadShot
				});
				user.save(function(error, user){
					if(error){
						res.json(error);
					}
					else{
						res.json(user);
					}
				});
			})
			.catch(function(error){
				res.json(error);
			});
		}
	});
});

module.exports = router;
