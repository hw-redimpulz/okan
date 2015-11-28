var express = require('express');
var router = express.Router();
var getTransitApi = require("../module/getTransitApi");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/notify', function(req,res,next){
  //var postData = req.body;
  //console.log(postData);
  //var userId = postData.id;
  //var checkPoints = postData.checkPoints;
  getTransitApi("京王多摩川","六本木",function(){});
});


module.exports = router;
