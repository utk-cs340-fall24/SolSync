import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import { Habit, SolSyncUser } from "@/types";

import { db } from "../../firebaseConfig";

export const getHabits = async (user: SolSyncUser): Promise<Habit[]> => {
  const habitsQuery = await getDocs(
    query(collection(db, "habits"), where("userId", "==", user.uid)),
  );

  const habits = habitsQuery.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() }) as Habit,
  );

  return habits;
};

export const createHabit = async (habit: Habit) => {
  await setDoc(doc(db, "habits", habit.id), habit);
};

export const deleteHabit = async (habit: Habit) => {
  await deleteDoc(doc(db, "habits", habit.id));
};
