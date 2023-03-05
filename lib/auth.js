import db from "./db";

export async function isAdmin(id) {
  if (id == null) return false;
  const user = await db.collection("users").doc(id).get();
  if (!user.exists) {
    return false;
  } else {
    return user.data().role === "admin";
  }
}
