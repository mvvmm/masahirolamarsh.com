import { isAdmin } from "../../../../lib/auth";
import { nanoid } from "nanoid";
import path from "path";
import { uploadToS3 } from "../../../../lib/aws";
import middleware from "../../../../middleware/middleware";
import nextConnect from "next-connect";

const handler = nextConnect();
handler.use(middleware);

const productsDir = path.join(process.cwd(), "public/img/products");

handler.post(async (req, res) => {
  let files, body;
  try {
    files = Object.keys(req.files).map((key) => req.files[key]);
    body = JSON.parse(req.body.data);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Problem with handler: ${err}`,
    });
    return;
  }

  // Check Auth
  if (!(await isAdmin(body.userID))) {
    res.status(403).send("Access forbidden");
    return;
  }

  //Generate Product ID
  const PID = nanoid();
  const productDir = path.join(productsDir, PID);

  //Upload Imgs
  files.forEach((file) => {
    console.log(file);
  });

  res
    .status(200)
    .json({ success: true, message: "Successfully added product to Database" });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
