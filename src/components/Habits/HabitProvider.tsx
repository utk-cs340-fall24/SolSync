import { createContext, useEffect, useState } from "react";

import useUser from "@/hooks/useUser";
import { createHabit, deleteHabit, getHabits } from "@/server";
import { Habit } from "@/types";

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
  const [user] = useUser();

  useEffect(() => {
    if (!user) return;

    const fetchHabits = async () => {
      const habits = await getHabits(user);
      setHabits(habits);
    };

    fetchHabits();
  }, [user]);

  const addHabit = async (habit: Habit) => {
    setHabits((prevHabits) => [...prevHabits, habit]);

    await createHabit(habit);
  };

  const removeHabit = async (habit: Habit) => {
    setHabits((prevHabits) =>
      prevHabits.filter((prevHabit) => prevHabit.id !== habit.id),
    );

    await deleteHabit(habit);
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
