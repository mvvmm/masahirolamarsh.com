import { isAdmin } from "../../../../lib/auth";
import { createPresignedPost } from "../../../../lib/aws";

export default async function handler(req, res) {
  const userID = req.query.userID;
  const productId = req.query.productID;
  const key = req.query.key;
  const contentType = req.query.contentType;
  if (!(await isAdmin(userID))) {
    res.status(403).send("Access forbidden");
    return;
  }

  const fields = {
    key: `products/${productId}/${key}`,
    "Content-Type": contentType,
  };

  const post = await createPresignedPost(fields);

  res.status(200).json(post);
}
