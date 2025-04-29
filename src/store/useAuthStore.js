import { create } from "zustand";
import { auth, db } from "../lib/firebase";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,

  // Signing up
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      ).then((cred) => {
        return setDoc(doc(db, "users", cred.user.uid), {
          username: data.username,
        });
      });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isSigningUp: false });
    }
  },
}));
