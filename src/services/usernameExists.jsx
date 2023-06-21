import { db } from "../config/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
export default async function usernameExists(username) {
  const q = query(collection(db, "users"), where("username", "==", username));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.length !== 0;
}