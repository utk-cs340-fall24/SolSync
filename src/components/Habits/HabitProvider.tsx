import { createContext, useState, useEffect, useRef } from "react";

import { Habit } from "@/types";
import { collection, getDocs, query, where } from "firebase/firestore";
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
  const hasFetchedHabits = useRef(false);
  const user = useUser();

  useEffect(() => {
    if (!user) return;

    const getHabits = async () => {
      const habitsQuery = await getDocs(
        query(collection(db, "habits"), where("userId", "==", user?.uid)),
      );

      const habits = habitsQuery.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as Habit,
      );

      setHabits(habits);
    };

    getHabits();

    hasFetchedHabits.current = true;
  }, [habits, user]);

  useEffect(() => {
    if (!hasFetchedHabits.current) {
      return;
    }

    // TODO: update habits in database
  }, [habits]);

  const addHabit = (habit: Habit) => {
    // TODO: Trishu add habit to database
    setHabits((prevHabits) => [...prevHabits, habit]);
  };

  const removeHabit = (habit: Habit) => {
    // TODO: Trishu remove habit from database
    setHabits((prevHabits) =>
      prevHabits.filter((prevHabit) => prevHabit.id !== habit.id),
    );
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
