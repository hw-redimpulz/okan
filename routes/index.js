var express = require('express');
var router = express.Router();
var getDuration = require('../module/getDuration');

/* GET home page. */
router.get('/', function(req, res, next) {
  getDuration(35.691649,139.705261,35.652044,139.540466,function(result){
    console.log(result)
  });
  res.render('index', { title: 'Express' });
});

module.exports = router;
