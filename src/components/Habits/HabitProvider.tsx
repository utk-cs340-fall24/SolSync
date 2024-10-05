import { createContext, useState, useEffect, useRef } from "react";

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
  const hasFetchedHabits = useRef(false);

  useEffect(() => {
    // TODO: Trishu fetch habits from database
    // const fetchHabitsFromDatabase = async () => {
    // };
    // await fetchHabitsFromDatabase();
    setHabits([
      {
        id: "1",
        userId: "1",
        name: "Meditate",
        notificationTime: "sunrise",
        emailNotificationEnabled: true,
        pushNotificationEnabled: true,
      },
      {
        id: "2",
        userId: "1",
        name: "Drink water",
        notificationTime: "sunset",
        emailNotificationEnabled: true,
        pushNotificationEnabled: true,
      },
      {
        id: "3",
        userId: "1",
        name: "Meditate",
        notificationTime: "sunrise",
        emailNotificationEnabled: true,
        pushNotificationEnabled: true,
      },
      {
        id: "4",
        userId: "1",
        name: "Meditate",
        notificationTime: "sunset",
        emailNotificationEnabled: true,
        pushNotificationEnabled: true,
      },
      {
        id: "5",
        userId: "1",
        name: "Meditate",
        notificationTime: "both",
        emailNotificationEnabled: true,
        pushNotificationEnabled: true,
      },
      {
        id: "6",
        userId: "1",
        name: "Meditate",
        notificationTime: "both",
        emailNotificationEnabled: true,
        pushNotificationEnabled: true,
      },
    ]);

    hasFetchedHabits.current = true;
  }, []);

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
