var express = require('express');
var router = express.Router();
var posts = require('../models/posts');

/* GET home page. */
router.get('/:name', function(req, res, next) {
  posts.getPostAbout(req.params.name)
  .then((listOfPosts) => {
    res.send(listOfPosts)
  })
});

router.post('/:name', function(req, res, next) {
  posts.createPost(req.params.name,req.body)
  .then((x) => {
    res.send(x)
  })
});

router.post('/:name', function(req, res, next) {
  let str ="create posts about "+req.params.name;
  res.send(str);
});

module.exports = router;
