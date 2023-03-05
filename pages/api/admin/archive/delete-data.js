import { isAdmin } from "../../../../lib/auth";
import firestore from "../../../../lib/db";

export default async function handler(req, res) {
  const userID = req.query.userID;
  const archiveID = req.query.archiveID;

  if (!(await isAdmin(userID))) {
    res.status(403).send("Access forbidden");
    return;
  }

  await firestore
    .collection("archive")
    .doc(archiveID)
    .delete()
    .then(() => {
      res.status(204).end();
    })
    .catch(async (err) => {
      res
        .status(500)
        .json({
          err: `Problem deleting archive data from firestore. archiveID: ${archiveID}, ${err}`,
        });
    });
}
