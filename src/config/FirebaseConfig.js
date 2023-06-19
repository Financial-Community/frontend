import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const apikey = process.env.REACT_APP_API_KEY

const firebaseConfig = {
  apiKey: apikey,
  authDomain: "lukas-project-384306.firebaseapp.com",
};
console.log(process.env.API_KEY)

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export the Firebase authentication module
export const auth = firebase.auth();
