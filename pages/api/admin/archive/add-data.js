import { isAdmin } from "../../../../lib/auth";
import { deleteAllArchiveImages } from "../../../../lib/aws";
import firestore from "../../../../lib/db";

export default async function handler(req, res) {
  const userID = req.query.userID;
  const data = req.body;

  if (!(await isAdmin(userID))) {
    res.status(403).send("Access forbidden");
    return;
  }

  await firestore
    .collection("archive")
    .doc(data.archiveID)
    .set(data)
    .then(() => {
      res.status(204).end();
    })
    .catch(async (err) => {
      deleteAllArchiveImages(data.archiveID)
        .then(() => {
          res.status(500).json({
            err: `Problem adding archive data to firestore. Successfully deleted images from S3. ArchiveID: ${data.archiveID}, ${err}`,
          });
        })
        .catch(() => {
          res.status(500).json({
            err: `Problem adding archive data to firestore. Couldn't delete images from S3. archiveID: ${data.archiveID}, ${err}`,
          });
        });
    });
}
