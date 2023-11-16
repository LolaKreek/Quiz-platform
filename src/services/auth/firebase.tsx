// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIZVaDRUPUxnfPSGgHs16I-EPWySUK2FY",
  authDomain: "pracadyplomowa-8a45f.firebaseapp.com",
  databaseURL: "https://pracadyplomowa-8a45f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pracadyplomowa-8a45f",
  storageBucket: "pracadyplomowa-8a45f.appspot.com",
  messagingSenderId: "324703695321",
  appId: "1:324703695321:web:2d75c84b9c0e8cc58c29c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);