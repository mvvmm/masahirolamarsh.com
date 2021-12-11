import firestore from "../../../lib/db";

export default async function handler(req, res) {
  const data = req.body;

  await firestore
    .collection("bid_01")
    .add({ email: data.email, bid: data.bid, piece: data.piece })
    .then(() => {
      res.status(204).end();
    })
    .catch(async (err) => {
      res.status(500).json({
        err: `Problem adding new bid: ${"tits"}, ${err}`,
      });
    });
}
