import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Dropdown } from "react-native-element-dropdown";
import { default as FAIcon } from "react-native-vector-icons/FontAwesome";

import { useHabit } from "@/hooks/useHabit";
import useUser from "@/hooks/useUser";
import { getHistory } from "@/server/histories";
import { Habit, History } from "@/types";

type DropdownItem = {
  label: string;
  value: string;
};

export default function HistoryComponent() {
  const [user, userIsLoading] = useUser();
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
    setCurrentHabit(habits[0]);
  }, [habits]);

  useEffect(() => {
    if (!user) return;

    const fetchHistory = async () => {
      const history = await getHistory(user);
      setHistory(history);
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
        selectedColor: "#f4a58a",
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
      <Text style={styles.header}>History</Text>
      <Dropdown
        data={getHabits()}
        onChange={onHabitChange}
        style={styles.dropdown}
        value={currentHabit?.id}
        labelField={"label"}
        valueField={"value"}
      />
      <Calendar
        style={styles.calendar}
        markedDates={calendarDates}
        maxDate={dayjs().format("YYYY-MM-DD")}
        theme={{
          todayTextColor: "#f4a58a",
          arrowColor: "#f4a58a",
        }}
      />
      <TouchableOpacity style={styles.completeHabitButton}>
        <FAIcon
          name="check-circle-o"
          size={25}
          color="white"
          style={{ marginHorizontal: 6 }}
        />
        <Text style={styles.buttonText}>Complete Habit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  calendar: {
    width: Dimensions.get("window").width * 0.95,
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 8,
  },
  header: {
    fontSize: 30,
    paddingBottom: 40,
    marginTop: 20,
  },
  completeHabitButton: {
    backgroundColor: "#b38acb",
    width: "95%",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 12,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderRadius: 8,
    paddingHorizontal: 16,
    width: "95%",
    backgroundColor: "#fff",
  },
});
