import { create } from "zustand";
import { auth, db } from "../lib/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  error: null,

  setError: (message) => {
    set({ error: message });
  },

  checkAuth: () => {
    set({ loading: true });
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      set({ user, loading: false });
    });
    return unsubscribe; // call this to stop listening when unmounted
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      set({ user: userCredential.user, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  register: async (displayName, email, password) => {
    set({ loading: true, error: null });
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Create a db entry for the user
      setDoc(doc(db, "users", userCredential.user.uid), {
        displayName,
      });
      set({ user: userCredential.user, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null });
    } catch (error) {
      set({ error: error.message });
    }
  },
}));

export default useAuthStore;
