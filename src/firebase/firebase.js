import firebase from 'firebase/compat'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAzBq4Jgt60ZwL5sLihI_uiqExG57Nl71I",
  authDomain: "bumbutpital-fe811.firebaseapp.com",
  projectId: "bumbutpital-fe811",
  storageBucket: "bumbutpital-fe811.appspot.com",
  messagingSenderId: "12368327116",
  appId: "1:12368327116:web:56f441ff5262e4f1992d69"
};

// Initialize Firebase
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;