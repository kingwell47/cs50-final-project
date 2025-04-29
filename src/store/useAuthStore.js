import { create } from "zustand";
import { auth, db } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
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

  logOut: async () => {
    try {
      await signOut(auth);
      set({ authUser: null });
    } catch (error) {
      console.error(error);
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      set({ authUser: res.user });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoggingIn: false });
    }
  },
}));
