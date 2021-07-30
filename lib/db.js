import firebase from "firebase/app";
import firebaseConfig from "../dbconfig";

const db = firebase.apps[0] ?? firebase.initializeApp(firebaseConfig);
export default db.firestore();
