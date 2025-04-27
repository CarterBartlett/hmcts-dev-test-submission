var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with all tasks');
});

router.put('/', function(req, res, next) {
  console.debug('update task', req.body);
  res.send('create a new task');
});

router.get('/search', function(req, res, next) {
  console.debug('search tasks', req.query);
  res.send('respond with search results');
});

router.get('/:id', function(req, res, next) {
  res.send(`respond with task ID ${req.params.id}`);
});

module.exports = router;