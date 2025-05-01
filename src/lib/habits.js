import {
  doc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export const saveHabit = async (habitData, userId) => {
  const docRef = await addDoc(collection(db, "habits"), {
    ...habitData,
    userId,
    createdAt: new Date(),
    completedDates: [], // Empty by default
  });
  return docRef;
};

export const getHabits = async (userId) => {
  const q = query(collection(db, "habits"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateHabitStatus = async (habitId, date) => {
  const habitRef = doc(db, "habits", habitId);
  await updateDoc(habitRef, {
    completedDates: arrayUnion(date),
  });
};

export const deleteHabit = async (habitId) => {
  await deleteDoc(doc(db, "habits", habitId));
};
