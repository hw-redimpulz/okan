var express = require('express');
var router = express.Router();
var getTransitApi = require("../module/getTransitApi");
var getWalkDuration = require("../module/getDuration");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/notify', function(req,res,next){
  //var postData = req.body;
  //console.log(postData);
  //var userId = postData.id;
  //var checkPoints = postData.checkPoints;


  var allDuration = 0;
  getWalkDuration("東京都調布市小島町3-24-11","京王多摩川駅",function(duration1){
    allDuration += duration1;
    console.log("徒歩:"+duration1);
    
    getTransitApi("京王多摩川駅","六本木駅",duration1,function(duration2){
      allDuration += duration2;
      console.log("電車:"+duration2);
    
      getWalkDuration("六本木駅","東京都港区六本木6丁目10番1号",function(duration3){
        allDuration += duration3;
        console.log("徒歩"+duration3);
        
        console.log("合計"+allDuration);
      }); 
    });
  });
});


module.exports = router;
