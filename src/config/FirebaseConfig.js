// FirebaseConfig.js

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCfQCR_mBetTQmCbeEk8_wf5COv_VSSzUY",
  authDomain: "lukas-project-384306.firebaseapp.com",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export the Firebase authentication module
export const auth = firebase.auth();
