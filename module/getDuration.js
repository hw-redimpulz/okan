var request = require('request');
var fs = require('fs');

module.exports = function(start,end,callback){
  var file = "./module/apikey.txt";
  fs.readFile(file, 'utf8', function(err,text){
    //console.log(text);

    var keys = JSON.parse(text);
    //console.log("keys"+ keys["google"]);
    var googlekey = keys["google"];
    //console.log("error:"+err);

    googleurl = "https://maps.googleapis.com/maps/api/distancematrix/json?mode=walking";
    //googleurl += "&origins="+lat1+","+lon1;
    googleurl += "&origins="+encodeURIComponent(start);
    //googleurl += "&destinations="+lat2+","+lon2;
    googleurl += "&destinations="+encodeURIComponent(end);
    googleurl += "&key="+googlekey;
    request(googleurl, function(error,response,body){
      if(!error && response.statusCode == 200){
        var json = JSON.parse(body);
        var duration = json["rows"][0]["elements"][0]["duration"]["value"];
        //console.log(duration);
        callback(duration);
      } else {
        console.log("error: "+ response.statusCode);
        callback(null);
      }
    });
  });
};
