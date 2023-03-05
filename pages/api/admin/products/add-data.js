import { isAdmin } from "../../../../lib/auth";
import { deleteAllProductImages } from "../../../../lib/aws";
import firestore from "../../../../lib/db";

export default async function handler(req, res) {
  const userID = req.query.userID;
  const data = req.body;

  if (!(await isAdmin(userID))) {
    res.status(403).send("Access forbidden");
    return;
  }

  await firestore
    .collection("products")
    .doc(data.productID)
    .set(data)
    .then(() => {
      res.status(204).end();
    })
    .catch(async (err) => {
      deleteAllProductImages(data.productID)
        .then(() => {
          res.status(500).json({
            err: `Problem adding product data to firestore. Successfully deleted images from S3. ProductID: ${data.productID}, ${err}`,
          });
        })
        .catch(() => {
          res.status(500).json({
            err: `Problem adding product data to firestore. Couldn't delete images from S3. ProductID: ${data.productID}, ${err}`,
          });
        });
    });
}
