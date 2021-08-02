import AWS from "aws-sdk";
import FormData from "form-data";
import axios from "axios";

const BUCKET_NAME = process.env.BUCKET_NAME;
const IAM_KEY = process.env.IAM_KEY;
const IAM_USER_SECRET = process.env.IAM_SECRET_KEY;
const REGION = process.env.REGION;

AWS.config.update({
  accessKeyId: IAM_KEY,
  secretAccessKey: IAM_USER_SECRET,
  region: REGION,
  signatureVersion: "v4",
});

export const s3 = new AWS.S3();

export async function createPresignedPost(fields) {
  const params = {
    Bucket: BUCKET_NAME,
    Fields: fields,
    Expires: 60, // seconds
    Conditions: [
      ["content-length-range", 0, 1048576], // up to 1 MB
    ],
  };
  return await s3.createPresignedPost(params);
}

export async function deleteProductImages(productID) {
  var listParams = {
    Bucket: BUCKET_NAME,
    Prefix: `products/${productID}`,
  };

  const listedObjects = await s3.listObjectsV2(listParams).promise();

  if (listedObjects.Contents.length === 0) return;

  const deleteParams = {
    Bucket: BUCKET_NAME,
    Delete: { Objects: [] },
  };

  listedObjects.Contents.forEach(({ Key }) => {
    deleteParams.Delete.Objects.push({ Key });
  });

  await s3.deleteObjects(deleteParams).promise();

  if (listedObjects.IsTruncated) return await deleteProductImages(productID);
  return;
}

export async function addProductImages(userID, productID, files) {
  const requests = [];
  await files.forEach(async (file) => {
    const key = encodeURIComponent(file.name);
    const contentType = encodeURIComponent(file.type);
    const res = await fetch(
      `/api/admin/products/add-img?key=${key}&contentType=${contentType}&productID=${productID}&userID=${userID}`
    );
    const { url, fields } = await res.json();
    const formData = new FormData();
    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    requests.push(axios.post(url, formData));
  });

  await axios.all(requests).catch(async (err) => {
    try {
      await axios(
        `/api/admin/products/delete-imgs?userID=${userID}&productID=${productID}`
      );
    } catch (err) {
      throw new Error(
        `Problem adding an image to S3. Couldn't delete product images from s3. ProductID: ${productID}, ${err}`
      );
    }
    throw new Error(
      `Problem adding an image to S3. Images successfully deleted from S3. Process aborted. ProductID: ${productID}`
    );
  });
}
