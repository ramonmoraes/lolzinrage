var express = require('express');
var router = express.Router();
var riotApi = require("../riotApi/api");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/allheros', function(req, res, next) {
  riotApi.getHeroAllMatters()
  .then((x) => {
    res.send(x)
  })
});

router.get('/getHeroName/:startWith', function(req, res, next) {
  riotApi.getHeroStartingWith(req.params.startWith)
  .then((x) => {
    res.send(x)
  })
});
router.get('/hero/:name', function(req, res, next) {
  riotApi.getHero(req.params.name)
  .then((hero) => {
    console.log(hero);
    res.send(hero);
  })
  .catch((err) => {
    res.send(false)
  })
});
router.get('/adm/attApi/:key', function(req, res, next) {
  riotApi.atualizarText(req.params.key);
  res.render('index', { title: 'Express' });
});

module.exports = router;
