import AWS from "aws-sdk";

const BUCKET_NAME = process.env.BUCKET_NAME;
const IAM_USER_KEY = process.env.IAM_KEY;
const IAM_USER_SECRET = process.env.IAM_SECRET_KEY;

export const s3 = new AWS.S3({
  accessKeyId: IAM_USER_KEY,
  secretAccessKey: IAM_USER_SECRET,
  Bucket: BUCKET_NAME,
});

export function uploadToS3(file) {
  var params = {
    Bucket: BUCKET_NAME,
    Key: file.name,
    Body: file,
  };
  s3.upload(params, function (err, data) {
    if (err) {
      console.log("error in callback");
      console.log("err" + err);
    }
    console.log("success");
    console.log("data" + data);
  });
}
