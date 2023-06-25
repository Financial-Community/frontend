import {useToast} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import usernameExists from "../services/usernameExists";
import {collection, doc, getDocs, getDoc, updateDoc, arrayUnion, arrayRemove} from "firebase/firestore";
import {db} from "../config/FirebaseConfig";
import {PROFILE} from "../routes";


export const getAllUsers = async () => {
  const ref = collection(db, "users");
  const docSnap = await getDocs(ref);
  return docSnap.docs;
}


export const getUser = async (userId) => {
  console.log(userId)
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    return userDoc.data();
  } else {
    console.log("No such document!");
    return null;
  }
}

export function useFollowingForUser() {
  const toast = useToast();

  async function followUser(uid, userToFollow) {
    try {
      await updateDoc(doc(db, "users", uid), {
        following: arrayUnion(userToFollow),
      })
      toast({
        title: `Successfully followed ${userToFollow}!`,
        status: "success",
        isClosable: true,
        position: "bottom-right",
        duration: 3000,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function unfollowUser(uid, userToUnfollow) {
    try {
      await updateDoc(doc(db, "users", uid), {
        following: arrayRemove(userToUnfollow),
      })
      toast({
        title: `Successfully unfollowed ${userToUnfollow}!`,
        status: "success",
        isClosable: true,
        position: "bottom-right",
        duration: 3000,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return {followUser, unfollowUser}
}

export function useChangeUsername() {
  const toast = useToast();
  const navigate = useNavigate();

  async function changeUsername(uid, username) {
    if (await usernameExists(username)) {
      toast({
        title: "Username already exists",
        status: "error",
        isClosable: true,
        position: "bottom-right",
        duration: 3000,
      });
      throw new Error("Username already exists");
    }
    console.log(uid, username)
    try {
      await updateDoc(doc(db, "users", uid), {
        username: username,
      })
      toast({
        title: "Successfully changed username",
        status: "success",
        isClosable: true,
        position: "bottom-right",
        duration: 3000,
      });
      navigate(PROFILE);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return {changeUsername};
}