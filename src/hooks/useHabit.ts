import { useContext } from "react";

import { HabitContext } from "@/providers/HabitProvider";

export const useHabit = () => {
  const context = useContext(HabitContext);

  if (!context) {
    throw new Error("useHabit must be used within a HabitProvider");
  }

  return context;
};
