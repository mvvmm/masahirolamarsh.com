import { isAdmin } from "../../../../lib/auth";
import firestore from "../../../../lib/db";

export default async function handler(req, res) {
  const userID = req.query.userID;
  const productID = req.query.productID;
  const data = req.body;

  if (!(await isAdmin(userID))) {
    res.status(403).send("Access forbidden");
    return;
  }

  await firestore
    .collection("products")
    .doc(productID)
    .update(data)
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => {
      res.status(500).json({
        err: `Problem updating product data to firestore. ProductID: ${productID}, ${err}`,
      });
    });
}
