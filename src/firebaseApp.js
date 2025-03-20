// firebaseApp.js
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updatePassword, 
  EmailAuthProvider, 
  reauthenticateWithCredential 
} from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMBBYkWJ_iuKJIlBgnTudO9xxelIkJulc",
  authDomain: "guitar-tab-tracker-4e352.firebaseapp.com",
  projectId: "guitar-tab-tracker-4e352",
  storageBucket: "guitar-tab-tracker-4e352.appspot.com",
  messagingSenderId: "573138749373",
  appId: "1:573138749373:web:9d11175fc82d48ba9c34d4"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user);
  } else {
    console.log("No user signed in.");
  }
});

export { 
  firebaseApp, 
  auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updatePassword, 
  EmailAuthProvider, 
  reauthenticateWithCredential 
};