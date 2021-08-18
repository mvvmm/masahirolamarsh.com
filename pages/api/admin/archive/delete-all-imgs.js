import { isAdmin } from "../../../../lib/auth";
import { deleteAllArchiveImages } from "../../../../lib/aws";

export default async function handler(req, res) {
  const userID = req.query.userID;
  const archiveID = req.query.archiveID;
  if (!(await isAdmin(userID))) {
    res.status(403).send("Access forbidden");
    return;
  }

  try {
    await deleteAllArchiveImages(archiveID);
  } catch (err) {
    console.log(
      `Problem deleting archive images. archiveID: ${archiveID}, ${err}`
    );
    res.status(500).end();
    return;
  } finally {
    console.log(`Successfully deleted archive images. archiveID: ${archiveID}`);
    res.status(204).end();
  }
  return;
}
