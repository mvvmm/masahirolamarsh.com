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

// Products
export async function deleteAllProductImages(productID) {
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

  if (listedObjects.IsTruncated) return await deleteAllProductImages(productID);
  return;
}

export async function deleteProductImages(userID, productID, keys) {
  const response = await fetch(
    `/api/admin/products/delete-imgs?userID=${userID}&productID=${productID}&keys=${JSON.stringify(
      keys
    )}`
  );
  return response;
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

  await axios.all(requests).catch(async (error) => {
    try {
      await axios(
        `/api/admin/products/delete-all-imgs?userID=${userID}&productID=${productID}`
      );
    } catch (err) {
      throw new Error(
        `Problem adding an image to S3. Couldn't delete product images from s3. ProductID: ${productID}, ${err}`
      );
    }
    throw new Error(
      `Problem adding an image to S3. Images successfully deleted from S3. Process aborted. ProductID: ${productID}, ${error}.`
    );
  });
}

export async function editProductImages(userID, productID, images) {
  const imagesToAdd = images.filter((img) => typeof img === "object");
  const list_res = await fetch(
    `/api/admin/products/list-imgs?productID=${productID}`
  );
  if (!list_res.ok) {
    const list_error = await list_res.json();
    throw new Error(
      `Problem listing images from S3. ProductID: ${productID}. ${list_error.err.message}`
    );
  }
  const s3Images = await list_res.json();
  const imagesToDelete = s3Images
    .filter(
      (img) =>
        images.indexOf(img.Key.replace(`products/${productID}/`, "")) === -1
    )
    .map((img) => img.Key);

  if (imagesToDelete.length > 0) {
    const delete_res = await fetch(
      `/api/admin/products/delete-imgs?userID=${userID}&productID=${productID}&keys=${JSON.stringify(
        imagesToDelete
      )}`
    );

    if (!delete_res.ok) {
      const delete_error = await delete_res.json();
      throw new Error(
        `Problem deleting images from S3. ProductID: ${productID}. ${delete_error.message}`
      );
    }
  }

  if (imagesToAdd.length > 0) {
    await addProductImages(userID, productID, imagesToAdd);
  }
}

// Archive
export async function deleteAllArchiveImages(archiveID) {
  var listParams = {
    Bucket: BUCKET_NAME,
    Prefix: `archive/${archiveID}`,
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

  if (listedObjects.IsTruncated) return await deleteAllArchiveImages(archiveID);
  return;
}

export async function queueDeleteAllArchiveImages(userID, archiveID) {
  const response = await fetch(
    `/api/admin/archive/delete-all-imgs?userID=${userID}&archiveID=${archiveID}`
  );
  return response;
}

export async function deleteArchiveImages(userID, archiveID, keys) {
  const response = await fetch(
    `/api/admin/archive/delete-imgs?userID=${userID}&archiveID=${archiveID}&keys=${JSON.stringify(
      keys
    )}`
  );
  return response;
}

export async function addArchiveImages(userID, archiveID, files) {
  const requests = [];
  await files.forEach(async (file) => {
    const key = encodeURIComponent(file.name);
    const contentType = encodeURIComponent(file.type);
    const res = await fetch(
      `/api/admin/archive/add-img?key=${key}&contentType=${contentType}&archiveID=${archiveID}&userID=${userID}`
    );
    const { url, fields } = await res.json();
    const formData = new FormData();
    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    requests.push(axios.post(url, formData));
  });

  await axios.all(requests).catch(async (error) => {
    try {
      await axios(
        `/api/admin/archive/delete-all-imgs?userID=${userID}&archiveID=${archiveID}`
      );
    } catch (err) {
      throw new Error(
        `Problem adding an image to S3. Couldn't delete archive images from s3. archiveID: ${archiveID}, ${err}`
      );
    }
    throw new Error(
      `Problem adding an image to S3. Images successfully deleted from S3. Process aborted. archiveID: ${archiveID}, ${error}.`
    );
  });
}

export async function editArchiveImages(userID, archiveID, images) {
  const imagesToAdd = images.filter((img) => typeof img === "object");
  const list_res = await fetch(
    `/api/admin/archive/list-imgs?archiveID=${archiveID}`
  );
  if (!list_res.ok) {
    const list_error = await list_res.json();
    throw new Error(
      `Problem listing images from S3. archiveID: ${archiveID}. ${list_error.err.message}`
    );
  }
  const s3Images = await list_res.json();
  const imagesToDelete = s3Images
    .filter(
      (img) =>
        images.indexOf(img.Key.replace(`archive/${archiveID}/`, "")) === -1
    )
    .map((img) => img.Key);

  if (imagesToDelete.length > 0) {
    const delete_res = await fetch(
      `/api/admin/archive/delete-imgs?userID=${userID}&archiveID=${archiveID}&keys=${JSON.stringify(
        imagesToDelete
      )}`
    );

    if (!delete_res.ok) {
      const delete_error = await delete_res.json();
      throw new Error(
        `Problem deleting images from S3. archiveID: ${archiveID}. ${delete_error.message}`
      );
    }
  }

  if (imagesToAdd.length > 0) {
    await addArchiveImages(userID, archiveID, imagesToAdd);
  }
}
