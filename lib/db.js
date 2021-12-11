import firebase from "firebase/app";
import "firebase/firestore";

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

// Products
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

export async function getProductData(productID) {
  const doc = await firestore.collection("products").doc(productID).get();
  return doc.data();
}

export async function editProductData(userID, productID, data) {
  const response = await fetch(
    `/api/admin/products/edit-data?userID=${userID}&productID=${productID}`,
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

export async function getAllProductData() {
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

export async function getAllActiveProducts() {
  const snapShot = await firestore
    .collection("products")
    .where("active", "==", true)
    .orderBy("dateAdded", "desc")
    .get();
  const data = [];
  snapShot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}

// Archive
export async function addArchiveData(userID, data) {
  const response = await fetch(`/api/admin/archive/add-data?userID=${userID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return response;
  } else {
    const json = await response.json();
    throw new Error(JSON.stringify(json));
  }
}

export async function deleteArchiveData(userID, data) {
  const response = await fetch(
    `/api/admin/archive/delete-data?userID=${userID}&archiveID=${data.archiveID}`
  );

  if (response.ok) {
    return response;
  } else {
    const json = await response.json();
    throw new Error(JSON.stringify(json));
  }
}

export async function editArchiveData(userID, archiveID, data) {
  const response = await fetch(
    `/api/admin/archive/edit-data?userID=${userID}&archiveID=${archiveID}`,
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

export async function getAllArchiveData() {
  const snapShot = await firestore.collection("archive").get();
  const data = [];
  snapShot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}

// Types
export async function getTypes() {
  const snapShot = await firestore.collection("types").get();
  const data = [];
  snapShot.forEach((type) => {
    data.push(type.id);
  });
  return data;
}

// Newsletter
export async function addToNewsLetter(email) {
  const data = {
    email,
  };
  const response = await fetch(`/api/newsletter/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return response;
  } else {
    const json = await response.json();
    throw new Error(JSON.stringify(json));
  }
}

export default firestore;
