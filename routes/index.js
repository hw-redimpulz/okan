var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/gijinorikaeapi',function(req,res,next){
  res.render(nantara.json);
});

router.get('/api/dasu',function(req,res,next){
  res.render(dasu.json);
});

router.get('/api/arrivingtime',function(req,res,next){
  res.render(arrivingtime.json);
});

module.exports = router;
