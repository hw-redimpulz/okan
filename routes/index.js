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
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('throwgps',function(result){
    atd.writeTodb(result,function(res){
      console.log(res);
    });
  });
  socket.on('shoki',function(result){
    
  });
});

module.exports = router;


/*

<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io();
</script>

*/
