var AWS = require('aws-sdk');

AWS.config.update({
   // region: 
   // endpoint: 
   // accessKeyId: 
   // secretAccessKey: 
  });
  
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var params = {
  TableName: 'Forum_Data',
  Key: {
    'UserID': {S: '001'},
    'PostTitle': {S: '001'}
  }
};

ddb.getItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", JSON.parse(JSON.stringify(data.Item)));
  }
});