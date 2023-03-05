import { isAdmin } from "../../../../lib/auth";
import { s3 } from "../../../../lib/aws";

export default async function handler(req, res) {
  const userID = req.query.userID;
  const keys = JSON.parse(req.query.keys);
  const deleteObjects = keys.map((Key) => ({
    Key,
  }));
  if (!(await isAdmin(userID))) {
    res.status(403).send("Access forbidden");
    return;
  }

  const deleteParams = {
    Bucket: process.env.BUCKET_NAME,
    Delete: { Objects: deleteObjects },
  };

  await s3
    .deleteObjects(deleteParams)
    .promise()
    .then((response) => {
      res.status(200).end();
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}
