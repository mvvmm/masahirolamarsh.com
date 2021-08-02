import { isAdmin } from "../../../../lib/auth";
import { deleteProductImages } from "../../../../lib/aws";

export default async function handler(req, res) {
  const userID = req.query.userID;
  const productID = req.query.productID;
  if (!(await isAdmin(userID))) {
    res.status(403).send("Access forbidden");
    return;
  }

  try {
    await deleteProductImages(productID);
  } catch (err) {
    console.log(
      `Problem deleting product images. Product ID: ${productID}, ${err}`
    );
    res.status(500).end();
    return;
  } finally {
    console.log(
      `Successfully deleted product images. Product ID: ${productID}`
    );
    res.status(204).end();
  }
  return;
}
