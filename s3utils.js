var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});

async function delete_all_objects(client_id){
  var s3 = new AWS.S3({apiVersion: '2006-03-01'});
  const params = {
            Bucket: 'ed-raw-data-bucket-123',
            Prefix: 'load_type=bulkload/client_id='+client_id+'/'
  };
  /*list the table name which will be deleted   
  response_list= s3.listObjects(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
  */ let result =   await s3.listObjects(params).promise();
     let list_object =[];
     let keys =[];
     list_object = result.$response.data.Contents;
     console.log(list_object.length);
     //console.log(list_object[1].Key);
     for(let i=0;i < list_object.length ;i++){
          keys.push(list_object[i].Key)
          let deleteparams={
            Bucket:'ed-raw-data-bucket-123',
            Key: list_object[i].Key
          }
          await s3.deleteObject(deleteparams).promise((data) => console.log(data), (error) => console.log(error));
        
     }
     console.log("The deleted data in table reset is")
     console.log(keys)
}

delete_all_objects('2.16.840.1.113883.3.140.000101')
