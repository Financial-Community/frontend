import {auth, db} from '../config/FirebaseConfig';
import {useAuthState, useSignOut} from "react-firebase-hooks/auth";
import firebase from "firebase/compat/app";
import {doc, setDoc, getDoc} from "firebase/firestore";
import HomePage from "../pages/HomePage";
import {useToast} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {ROOT} from "../routes";


const provider = new firebase.auth.GoogleAuthProvider();

export function useAuth() {
  const [authUser , authLoading, error] = useAuthState(auth);
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log(isLoading);
    async function fetchData(){
      const ref = doc(db, "users", authUser.uid);
      const docSnap = await getDoc(ref);
      setUser(docSnap.data());
      setLoading(false);
    }
    if(!authLoading){
      if(authUser) {
        fetchData();
      }else {
        setLoading(false);
      }
    }

  },[authLoading, authUser, isLoading]);

  return {authUser, user , isLoading, error };
}

export function useLoginWithMail(){
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  async function loginWithMail({email, password, redirectTo = HomePage}){
    setLoading(true);

    try {
      await auth.signInWithEmailAndPassword(email, password);
      toast({
        title: "You are logged in!",
        status: "success",
        isClosable: true,
        position: "bottom-right",
        duration: 3000,
      });
      navigate(redirectTo)
    } catch (error) {
      toast({
        title: "Logging in failed!",
        status: "error",
        description: error.message,
        isClosable: true,
        position: "bottom-right",
        duration: 3000,
      });
      setLoading(false);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
    setLoading(false);
  }

  async function loginWithGooglePopup() {
    setLoading(true);
    try {
      const res = await auth.signInWithPopup(provider);
      const userDoc = await  getDoc(doc(db , "users", res.user.uid))
      if(!userDoc.exists()){
        await  setDoc(doc(db , "users", res.user.uid), {
          id: res.user.uid,
          username: res.user.displayName,
          avatar: res.user.photoURL,
          following: [],
          date: Date.now(),
        })
      }
      toast({
        title: "You are logged in!",
        status: "success",
        isClosable: true,
        position: "bottom-right",
        duration: 3000,
      });
      navigate("/")
    } catch (error) {
      toast({
        title: "Logging in failed!",
        status: "error",
        description: error.message,
        isClosable: true,
        position: "bottom-right",
        duration: 3000,
      });
      setLoading(false);
    }
  }

  return {isLoading, loginWithMail, loginWithGooglePopup};
}

export function useSignUpWithEmail() {

  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  async function signUpWithEmail(email, password) {
    setLoading(true);
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password);
      await  setDoc(doc(db , "users", res.user.uid), {
        id: res.user.uid,
        username: email.split("@")[0],
        avatar: "",
        following: [],
        date: Date.now(),
      })
      toast({
        title: "Account created.",
        description: "You are now logged in.",
        status: "success",
        isClosable: true,
        position: "bottom-right",
        duration: 3000,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Account creation failed.",
        description: error.message,
        status: "error",
        isClosable: true,
        position: "bottom-right",
        duration: 3000,
      });
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return{signUpWithEmail, isLoading};
}

export function useLogout() {
  const [signOut, isLoading] = useSignOut(auth);
  const toast = useToast();
  const navigate = useNavigate();

  async function logout() {
    if (await signOut()) {
      toast({
        title: "Successfully logged out",
        status: "success",
        isClosable: true,
        position: "bottom-right",
        duration: 3000,
      });
      navigate(ROOT);
    } // else: show error [signOut() returns false if failed]
  }

  return { logout, isLoading };
}


