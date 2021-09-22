import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyArNhSKwMyOCVKkYyrdaMNI_Komn8yuHps",
  authDomain: "bumbutpital-addcd.firebaseapp.com",
  projectId: "bumbutpital-addcd",
  storageBucket: "bumbutpital-addcd.appspot.com",
  messagingSenderId: "357719772582",
  appId: "1:357719772582:web:df50fd2bd9c88ab1b79367",
};
firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();
export default storage;
