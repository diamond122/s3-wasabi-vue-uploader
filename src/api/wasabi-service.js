const S3 = require('aws-sdk/clients/s3');
const AWS = require('aws-sdk');
const endPointUrl = 's3.us-east-2.wasabisys.com';
const wasabiEndpoint = new AWS.Endpoint(endPointUrl);

const accessKeyId = process.env.VUE_APP_WASABI_ACCESS_KEY_ID; // accessKey for Wasabi
const secretAccessKey = process.env.VUE_APP_WASABI_SECRET_ACCESS_KEY; // secretAccessKey for Wasabi

const s3 = new S3({
  endpoint: wasabiEndpoint,
  region: 'us-east-2',
  accessKeyId,
  secretAccessKey
});
const Bucket = process.env.VUE_APP_WASABI_BUCKET;

const upload = ({ Key, Body }) => {
  return new Promise((resolve, reject) => s3.putObject(
    {
      Body,
      // Bucket: process.env.VUE_APP_S3_BUCKET,
      Bucket,
      Key
    }, (err, data) => {
      if (err) {
        reject('Error!');
      } else {
        resolve(true);
      }
    }));
};
const getPublicUrlFromKey = (key) => {
  return `https://${endPointUrl}/${Bucket}/${key}`;
};
const getRecentFiles = (count) => {
    return new Promise((resolve, reject) => s3.listObjects(
      { Bucket, MaxKeys: count }, (err, data) => {
      if (err) {
        reject('Error!');
      } else {
        // resolve(data.Contents.sort((a, b) => b.LastModified - a.LastModified).map(content => ({
        //   lastModified: content.LastModified.toLocaleDateString('us', {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'}),
        //   publicUrl: getPublicUrlFromKey(content.Key),
        // })));
        resolve(data.Contents.sort((a, b) => a.key > b.key ? -1 : 1).map(content => ({
          lastModified: content.Key,
          publicUrl: getPublicUrlFromKey(content.Key)
        })));
      }
    }));
};

export default {
  upload,
  getRecentFiles,
};