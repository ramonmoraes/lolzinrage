var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/:name', function(req, res, next) {
  let str ="get posts about "+req.params.name;
  res.send(str);
});

router.post('/:name', function(req, res, next) {
  let str ="get posts about "+req.params.name;
  res.send(str);
});

router.post('/:name', function(req, res, next) {
  let str ="create posts about "+req.params.name;
  res.send(str);
});

module.exports = router;
