var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});

async function delete_all_objects(){
  var s3 = new AWS.S3({apiVersion: '2006-03-01'});
  const params = {
            Bucket: 'ed-raw-data-bucket-123',                                     //But the bucket Name from where you want to delete the data.
            Prefix: 'load_type=bulkload/'                                         // Prefix to navigate to the location where you want to delete the data to a certail S3 folder.
  };
  /*list the table name which will be deleted   
  response_list= s3.listObjects(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
  */ 
   //Listing the objects form S3 location.
     let result =   await s3.listObjects(params).promise();
     let list_object =[];
     let keys =[];
     list_object = result.$response.data.Contents;
     console.log(list_object.length);
     //console.log(list_object[1].Key);
     for(let i=0;i < list_object.length ;i++){
          keys.push(list_object[i].Key)
          let deleteparams={
            Bucket:'ed-raw-data-bucket-123',                                     //But the bucket Name from where you want to delete the data.
            Delete: {Key:list_object[i].Key}
          }
          //Deleting the objects from s3 location.
          await s3.deleteObjects(deleteparams).promise((data) => console.log(data), (error) => console.log(error));                   //S3.deleteObjects,the http rrsponse if the data is there or not there,it will always give 200 Okay as status code in return.
     }
  
     console.log("The deleted data in table reset is")
     console.log(keys)
}
