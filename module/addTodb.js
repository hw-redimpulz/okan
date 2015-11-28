var mg = require('mongoose');
var async = require('async');

//mongodb定義
var Schema = mg.Schema;
var positionsSchema = new Schema({
  id:Number,
  time:Date,
  position:{
    lat:Number,
    lon:Number
  }
},{collections:'positions'});
var usersSchema = new Schema({
  id:Number,
  name:String,
  home:{
    lat:Number,
    lon:Number
  },
  checkPoints:[
    {
      name:String,
      position:{
        lat:Number,
        lon:Number
      }
    }
  ]
},{collection:'users'});
mg.model('Positions',positionsSchema);
var Positions = mg.model('Positions');
mg.model('Users',usersSchema);
var Users = mg.model('Users');



/*
  in:idとか時間とか座標とか
  out:格納したかどうか
*/

module.exports.writeTodb = function(imports,callback){
  mg.connect('mongodb://localhost/okan');
  var importsJason = 'test';
  var fkinDate = new Date({
    year:1993,
    month:3,
    day:26,
    hour:22,
    minute:43,
    second:43
  });
  var positions = new Positions({
    id:32432,
    time:fkinDate,
    position:{
      lat:234,
      lon:235
    }
  });
  positions.save(function(err){
    mg.disconnect(function(err){
      callback(err);
      callback('test格納完了したよ');
    });
  });
}

/*
  in:id
  out:帰宅状態になっているか(チェックポイントを全部埋めているか)
*/

module.exports.checkMove = function(imports,callback){
  mg.connect('mongodb://localhost/okan',function(err){
    console.log('connect err:' + err);
  });
  var hani = 50;
  var importsJson = imports;
  console.log(importsJson);
  async.waterfall([
    function(next){
      console.log('最新5個取得開始');
      Positions.find({id:importsJson.id}).sort({'date':-1}).limit(5).exec(function(err,ret){
        var avelat,avelon = 0;
        ret.forEach(function(line){
          avelat = avelat + line;
          avelon = avelon + line;
        });
        avelat = avelat / 5;
        avelon = avelon / 5;
        next(null,avelat,avelon);
      });
    },
    function(avelat,avelon,next){
      Users.find({id:importsJson.id},function(err,docs){
        var flag = 0;
        async.each(docs.home,function(line,next2){
          if(line.lat + hani >= avelat && line.lat + hani <= avelat && line.lon + hani >= avelon && line.lon + hani <= avelon){
            flag++;
          }
          next2(null,flag,line.count);
        },function(err,result,count){
          if(flag == count){
            next(null,true);
          }
          else{
            next(null,false);
          }
        });
      });
    }
  ],function(err,result){
    mg.disconnect(function(err){
      callback(result);
    });
  });
}
