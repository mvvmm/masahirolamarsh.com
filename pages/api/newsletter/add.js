import firestore from "../../../lib/db";

export default async function handler(req, res) {
  const data = req.body;

  await firestore
    .collection("newsletter")
    .doc(data.email)
    .set({})
    .then(() => {
      res.status(204).end();
    })
    .catch(async (err) => {
      res.status(500).json({
        err: `Problem adding email to newsletter: ${data.email}, ${err}`,
      });
    });
}
