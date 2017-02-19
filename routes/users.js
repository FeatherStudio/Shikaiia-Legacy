var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('creature.vue', { title: 'Express' });
});

module.exports = router;
