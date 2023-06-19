// AuthService.js

import { auth } from '../config/FirebaseConfig';
import firebase from "firebase/compat/app";

const provider = new firebase.auth.GoogleAuthProvider();

// Sign up with email and password
export const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    console.log(userCredential.user)
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const loginWithGooglePopup = async () => {
  try {
    const userCredential = await auth.signInWithPopup(provider);
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Login with email and password
export const loginWithEmail = async (email, password) => {
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
