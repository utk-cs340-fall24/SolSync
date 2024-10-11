import { createContext, useState, useEffect, useRef } from "react";

import { Habit } from "@/types";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import useUser from "@/hooks/useUser";

export type HabitContextType = {
  habits: Habit[];
  addHabit: (habit: Habit) => void;
  removeHabit: (habit: Habit) => void;
};

export const HabitContext = createContext<HabitContextType | null>(null);

type HabitProviderProps = {
  children: React.ReactNode;
};

export default function HabitProvider({ children }: HabitProviderProps) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const user = useUser();

  useEffect(() => {
    if (!user) return;

    const fetchHabits = async () => {
      const habitsQuery = await getDocs(
        query(collection(db, "habits"), where("userId", "==", user?.uid)),
      );

      const habits = habitsQuery.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as Habit,
      );

      setHabits(habits);
    };

    fetchHabits();
  }, [user]);

  const addHabit = async (habit: Habit) => {
    setHabits((prevHabits) => [...prevHabits, habit]);

    await setDoc(doc(db, "habits", habit.id), habit);
  };

  const removeHabit = async (habit: Habit) => {
    setHabits((prevHabits) =>
      prevHabits.filter((prevHabit) => prevHabit.id !== habit.id),
    );

    await deleteDoc(doc(db, "habits", habit.id));
  };

  return (
    <HabitContext.Provider
      value={{
        habits,
        addHabit,
        removeHabit,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
}
