// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZN29RwASkgYY2c1s3MA_-RoiOrM6VkeQ",
  authDomain: "e-commerce-a83c7.firebaseapp.com",
  projectId: "e-commerce-a83c7",
  storageBucket: "e-commerce-a83c7.appspot.com",
  messagingSenderId: "873459311136",
  appId: "1:873459311136:web:b61b4599756e2f3f699245"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
