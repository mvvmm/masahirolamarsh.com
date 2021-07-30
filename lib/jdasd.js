import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBaMhmuWa9-DCJBQczGDXrYCMwsNvToPdI",
  authDomain: "masahiro-lamarsh-corp.firebaseapp.com",
  projectId: "masahiro-lamarsh-corp",
  storageBucket: "masahiro-lamarsh-corp.appspot.com",
  messagingSenderId: "45928137161",
  appId: "1:45928137161:web:a65d7a94d0b4dc081ae818",
  measurementId: "G-FEC2ZSWK70",
};

const db = firebase.apps[0] ?? firebase.initializeApp(firebaseConfig);
export default db.firestore();
