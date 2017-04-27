var express = require('express');
var router = express.Router();
var request = require('request');

/**
 * TODO: Add user save look up if exists.
 */

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/**
 * Gets kd for a user
 */
router.get('/:username', function (req, res) {
    var username = req.params.username;

    if(!username){
        res.send('No Username.');
    }

    var platform = '3',
        displayName = req.params.username,
        game = 'tunguska'
        options = {
            url: 'https://battlefieldtracker.com/bf1/api/Stats/DetailedStats?platform='+platform+'&displayName='+username+'&game='+game,
            headers: {
              'TRN-Api-Key':'e9fac43d-764a-4b5e-a20d-acd05e12ada5'
            }
        };

    request(options, function (err, resp, body) {
        body = JSON.parse(body);

        if(body.successful === true){
            var result = body.result;
            res.render('user', {kd: result.kdr, username: username});
        }else{
            res.render('error', err);
        }
    });
});

module.exports = router;
