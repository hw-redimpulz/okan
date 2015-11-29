var express = require('express');
var router = express.Router();
var push = require('../module/pushpush');
var io = require('socket.io')(3001);
var atd = require('../module/addTodb');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});

io.on('connection', function(socket){
  socket.on('throwgps',function(result){
    //帰宅時間表示のトリガー
    console.log(result);
  });
  socket.on('buchigire',function(message){
    //messageを子にpushする
    console.log(message);
  });
  socket.on('shoki',function(result){
    //初期瀬底をdbに格納するよ
    console.log(result);
  });
});

module.exports = router;


/*

<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io();
</script>

*/
