import { create } from "zustand";
import { auth, db } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isLoading: true,

  // Get user
  getUser: async (uid) => {
    if (!uid) return set({ authUser: null, isLoading: false });
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    try {
      if (docSnap.exists()) {
        set({
          authUser: docSnap.data(),
          isLoading: false,
        });
      } else {
        set({ authUser: null, isLoading: false });
      }
    } catch (error) {
      console.error(error);
    }
  },

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
      await signInWithEmailAndPassword(auth, data.email, data.password).then(
        (cred) => {
          console.log(cred.user.uid);
          return set({ authUser: cred.user.uid });
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoggingIn: false });
    }
  },
}));
