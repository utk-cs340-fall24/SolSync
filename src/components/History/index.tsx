import useUser from "@/hooks/useUser";
import dayjs from "dayjs";
import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import { Dropdown } from "react-native-element-dropdown";

export default function Habits() {
  const user = useUser();
  const [currentHabit, setCurrentHabit] = useState({
    name: "walking",
    id: "1",
  });

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Please sign in to view your habits</Text>
      </View>
    );
  }

  const getHabitsList = () => {
    const data = [
      {
        name: "walking",
        id: "1",
      },
      {
        name: "praying",
        id: "2",
      },
      {
        name: "sleeping",
        id: "3",
      },
      {
        name: "reading",
        id: "4",
      },
    ];

    return data.map((habit) => ({
      label: habit.name,
      value: habit.id,
    }));
  };

  const getHistory = () => {
    const data = [
      {
        date: new Date("2024-10-01"),
        habitId: "1",
        userId: "zUEEZuHjfmE2ftRjocJ7",
      },
      {
        date: new Date("2024-10-02"),
        habitId: "1",
        userId: "zUEEZuHjfmE2ftRjocJ7",
      },
      {
        date: new Date("2024-10-01"),
        habitId: "4",
        userId: "zUEEZuHjfmE2ftRjocJ7",
      },
      {
        date: new Date("2024-10-02"),
        habitId: "4",
        userId: "zUEEZuHjfmE2ftRjocJ7",
      },
      {
        date: new Date("2024-10-03"),
        habitId: "1",
        userId: "zUEEZuHjfmE2ftRjocJ7",
      },
      {
        date: new Date("2024-10-05"),
        habitId: "2",
        userId: "zUEEZuHjfmE2ftRjocJ7",
      },
      {
        date: new Date("2024-10-06"),
        habitId: "2",
        userId: "zUEEZuHjfmE2ftRjocJ7",
      },
      {
        date: new Date("2024-10-02"),
        habitId: "3",
        userId: "zUEEZuHjfmE2ftRjocJ7",
      },
      {
        date: new Date("2024-10-07"),
        habitId: "2",
        userId: "zUEEZuHjfmE2ftRjocJ7",
      },
      {
        date: new Date("2024-10-08"),
        habitId: "1",
        userId: "zUEEZuHjfmE2ftRjocJ7",
      },{
        date: new Date("2024-10-12"),
        habitId: "1",
        userId: "zUEEZuHjfmE2ftRjocJ7",
      },
    ];

    const habitHistory = {};

    data
      .filter((history) => history.habitId === currentHabit.id)
      .forEach((history) => {
        const date = dayjs(history.date);

        habitHistory[date.format("YYYY-MM-DD")] = { selected: true };
      });

    return habitHistory;
  };

  return (
    <View style={styles.container}>
      <Text>History</Text>
      <Dropdown
        data={getHabitsList()}
        onChange={(item) => {
          setCurrentHabit({
            name: item.label,
            id: item.value,
          });
        }}
        style={styles.picker}
        value={currentHabit.id}
        labelField={"label"}
        valueField={"value"}
      />
      <Calendar style={styles.calendar} markedDates={getHistory()} />
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
