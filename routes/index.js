var express = require('express');
var router = express.Router();
var request = require('request');
var Config = require('../config.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

router.get('/api/top/:page', function(req, res, next) {
  request(Config.topStoriesUrl, function(error, response, body) {
    if(error) throw error;
      body = JSON.parse(body);
      body.sort((a,b) => b -a);
      let pg = [];
      for(let i = 0; i < 10; i++) {
        let tmp = [];
        for(let k = 0; k < 50; k++) {
          tmp.push(body.shift());
        }
        pg[i] = tmp;
      }
      res.json(pg[req.params.page]);
  });
});

// This can be used for stories, their children, (comments)
router.get('/api/:id', function(req, res, next) {
  request(Config.baseUrl + req.params.id + '.json', function(error, response, body) {
    if(error) throw error;
      res.json(JSON.parse(body));
  });
});

module.exports = router;
