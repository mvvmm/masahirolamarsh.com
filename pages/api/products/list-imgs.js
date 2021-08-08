import { s3 } from "../../../lib/aws";

export default async function handler(req, res) {
  const productID = req.query.productID;

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Prefix: `products/${productID}`,
  };

  await s3
    .listObjectsV2(params)
    .promise()
    .then((response) => res.status(200).json(response.Contents))
    .catch((err) => {
      res.status(500).json({ err });
    });
}
