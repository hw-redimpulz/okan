var gcm = require('node-gcm');

module.exports.push = function(data,callback){
  console.log('data:' + data);
  var message = new gcm.Message();

  message.addData('data', 'test');

  var regTokens = ['APA91bHPGvprmH7FyvhefLMrRgknnvWnc2MMX6w78WBEQgO5IL0B9yKGs80yz_rlbePZlSLBcz4vuXoxnMYRdKDG5W0dgNFqTXl9DOI7_iBdKNq1gw4hy3yBuhugq5vT9GCpYeCt0vRh'];

  // Set up the sender with you API key
  var sender = new gcm.Sender('AIzaSyDGdTge3xvdfMYlZZORbQb-_CbkVjpudCg');

  // Now the sender can be used to send messages
  sender.send(message, { registrationTokens: regTokens }, function (err, response){
      if(err) callback(err);
      else    callback(response);
  });
}
