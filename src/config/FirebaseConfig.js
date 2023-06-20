import firebase from 'firebase/compat/app';
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import 'firebase/compat/auth';


//  Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "lukas-project-384306.firebaseapp.com",
  projectId: "lukas-project-384306",
  storageBucket: "lukas-project-384306.appspot.com",
  messagingSenderId: "870072936822",
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Export the Firebase authentication module
export const auth = firebase.auth();
export const db = getFirestore(app);
export const storage = getStorage(app);
