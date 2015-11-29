var client = require('cheerio-httpcli');
var moment = require('moment');

module.exports = function(startStation,endStation,callback){
  var date = moment().format();
  var year = moment().format("YYYY");
  var month = moment().format("MM");
  var day = moment().format("DD");
  var hour = moment().format("HH");
  var minute = moment().format("mm");
  console.log(minute);
  var minute1 = minute.substr(0,1);
  var minute2 = minute.substr(1,1);
  //var etc = "&type=1&ticket=ic&al=1&shin=1&ex=1&hb=1&lb=1&sr=1&s=0&expkind=1&ws=2"
  var baseUrl = "http://transit.yahoo.co.jp/search/result";
  var param = "?flatlon=&from="+encodeURIComponent(startStation)+"&tlatlon=&to="+encodeURIComponent(endStation)+"&via=&via=&via=&y="+year+"&m="+month+"&d="+day+"&hh="+hour+"&m2="+minute2+"&m1="+minute1;
  var url = baseUrl+param;
  //url = "http://transit.yahoo.co.jp/search/result?flatlon=&from=%E4%BA%AC%E7%8E%8B%E5%A4%9A%E6%91%A9%E5%B7%9D&tlatlon=&to=%E6%96%B0%E5%AE%BF&via=&via=&via=&y=2015&m=11&d=29&hh=06&m2=1&m1=1&kw=%E6%96%B0%E5%AE%BF";
  console.log(url);
  client.fetch(url,function(err,$,res){
    //console.log($.html());
    var route = $(".routeDetail");
    var startStationInfo = route.find(".station").eq(0);
    var endStationInfo = route.find(".fareSection").eq(0).nextAll(".station").eq(0);
    var startStationTimeStr = startStationInfo.find(".time li").text();
    var endStationTimeStr = endStationInfo.find(".time li").text();
    var lines = [];
    route.find(".transport").each(function(){
     if($(this).find(".icon").text()==="[train]"){
        var lineData = $(this).find("div").text();
        var line = lineData.match(/\[train\](.*?)・.*/)[1];
        //console.log(line);
        lines.push(line);
      }
    });
    var data = {
      "departure": year+"-"+month+"-"+day+"T"+startStationTimeStr+":00",
      "arrival" : year+"-"+month+"-"+day+"T"+endStationTimeStr+":00"
    }
    console.log(data.departure);
    console.log(data.arrival);
    callback(data);
  });
  
}
