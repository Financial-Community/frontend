// AuthService.js

import { auth } from '../config/FirebaseConfig';

// Sign up with email and password
export const signUp = async (email, password) => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};


// Login with email and password
export const login = async (email, password) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Logout
export const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Reset password
export const resetPassword = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update user profile
export const updateProfile = async (displayName) => {
  try {
    const user = auth.currentUser;
    await user.updateProfile({
      displayName: displayName,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

/*
import firebase from "firebase/compat";

<script src="https://www.gstatic.com/firebasejs/8.0/firebase.js"></script>
<script>
  var config = {
};
  firebase.initializeApp(config);
</script>
<script>
  var email = "lukaskahl2001@gmail.com";
  var password = "password";

  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  document.getElementById("message").innerHTML = "Welcome, " + user.email;
} else {
  document.getElementById("message").innerHTML = "No user signed in.";
}
});

  .catch(function(error) {
  document.getElementById("message").innerHTML = error.message;
});
</script>
 */

// AuthService.js can include additional methods for managing user-related operations like updating email, changing password, etc.
