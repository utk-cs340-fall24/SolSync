import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native";
import { Calendar } from "react-native-calendars";
import { Dropdown } from "react-native-element-dropdown";

import { useHabit } from "@/hooks/useHabit";
import useUser from "@/hooks/useUser";
import { getHistory } from "@/server/histories";
import { Habit, History } from "@/types";

type DropdownItem = {
  label: string;
  value: string;
};

export default function HistoryComponent() {
  const { user, userIsLoading } = useUser();
  const { habits } = useHabit();
  const [currentHabit, setCurrentHabit] = useState<Habit>();
  const [history, setHistory] = useState<History[]>();
  const [calendarDates, setCalendarDates] = useState<unknown>();

  const habitToDropdownItem = (habit: Habit) => {
    return {
      label: habit.name,
      value: habit.id,
    } as DropdownItem;
  };

  const dropdownItemToHabit = (dropdownItem: DropdownItem) => {
    return habits.find((habit) => habit.id === dropdownItem.value);
  };

  const getHabits = () => {
    return habits.map((habit) => habitToDropdownItem(habit));
  };

  const onHabitChange = (item: DropdownItem) => {
    setCurrentHabit(dropdownItemToHabit(item));
  };

  useEffect(() => {
    if (!user) return;

    const fetchHistory = async () => {
      const history = await getHistory(user);
      setHistory(history);
    };

    fetchHistory();
  }, [user]);

  useEffect(() => {
    const dates = history
      ?.filter((history) => history.habitId === currentHabit?.id)
      .map((history) => dayjs(history.date));

    const calenderDates: Record<string, {}> = {};

    dates?.forEach((date) => {
      calenderDates[date.format("YYYY-MM-DD")] = {
        selected: true,
      };
    });

    setCalendarDates(calenderDates);
  }, [currentHabit?.id, history]);

  if (userIsLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#000000" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Please sign in to view your habits</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>History</Text>
      <Dropdown
        data={getHabits()}
        onChange={onHabitChange}
        style={styles.picker}
        value={currentHabit?.id}
        labelField={"label"}
        valueField={"value"}
      />
      <Calendar
        style={styles.calendar}
        markedDates={calendarDates}
        maxDate={dayjs().format("YYYY-MM-DD")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    width: "70%",
    borderWidth: 1,
  },
  calendar: {
    height: 300,
    width: 400,
    marginTop: 30,
  },
});
