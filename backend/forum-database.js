var AWS = require('aws-sdk');

AWS.config.update({
    region: "eu-west-1",
    endpoint: 'https://dynamodb.eu-west-1.amazonaws.com',
    accessKeyId: "AKIAVZODYHL2UFSAGJVK",
    secretAccessKey: "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"
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