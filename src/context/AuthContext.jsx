import {auth} from '../config/FirebaseConfig';
import {useAuthState, useSignOut} from "react-firebase-hooks/auth";
import firebase from "firebase/compat/app";
import HomePage from "../pages/HomePage";
import {useToast} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {ROOT} from "../routes";


const provider = new firebase.auth.GoogleAuthProvider();

export function useAuth() {
  const [authUser , isLoading, error] = useAuthState(auth);

  return { user: authUser, isLoading, error };
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
        position: "top",
        duration: 3000,
      });
      navigate(redirectTo)
    } catch (error) {
      toast({
        title: "Logging in failed!",
        status: "error",
        description: error.message,
        isClosable: true,
        position: "top",
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
      await auth.signInWithPopup(provider);
      toast({
        title: "You are logged in!",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 3000,
      });
      navigate("/")
    } catch (error) {
      toast({
        title: "Logging in failed!",
        status: "error",
        description: error.message,
        isClosable: true,
        position: "top",
        duration: 3000,
      });
      setLoading(false);
    }
  }

  return {isLoading, loginWithMail, loginWithGooglePopup};
}


export function useSignUpWithEmail() {

  const [isLoading, setLoading] = useState(false);

  async function signUpWithEmail(email, password) {
    setLoading(true);
    try {
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      throw new Error(error.message);
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
        position: "top",
        duration: 3000,
      });
      navigate(ROOT);
    } // else: show error [signOut() returns false if failed]
  }

  return { logout, isLoading };
}