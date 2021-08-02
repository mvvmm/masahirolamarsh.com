import firebase from "firebase/app";
import "firebase/firestore";
import { deleteProductImages } from "./aws";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "masahiro-lamarsh-corp.firebaseapp.com",
  projectId: "masahiro-lamarsh-corp",
  storageBucket: "masahiro-lamarsh-corp.appspot.com",
  messagingSenderId: "45928137161",
  appId: "1:45928137161:web:a65d7a94d0b4dc081ae818",
  measurementId: "G-FEC2ZSWK70",
};

const db = firebase.apps[0] ?? firebase.initializeApp(firebaseConfig);
const firestore = db.firestore();

export async function addProductData(userID, data) {
  const response = await fetch(
    `/api/admin/products/add-data?userID=${userID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (response.ok) {
    return response;
  } else {
    const json = await response.json();
    throw new Error(JSON.stringify(json));
  }
}

export async function getProductData() {
  const snapShot = await firestore
    .collection("products")
    .orderBy("active", "desc")
    .orderBy("dateAdded", "desc")
    .get();
  const data = [];
  snapShot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}

export default firestore;
