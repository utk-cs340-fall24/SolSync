import { useHabit } from "@/hooks/useHabit";
import useUser from "@/hooks/useUser";
import { Habit, History } from "@/types";
import dayjs from "dayjs";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import { Dropdown } from "react-native-element-dropdown";
import { db } from "../../../firebaseConfig";

type DropdownItem = {
  label: string;
  value: string;
};

export default function Habits() {
  const user = useUser();
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

  const habitToCalenderDates = () => {
    const dates = history
      ?.filter((history) => history.habitId === currentHabit?.id)
      .map((history) => dayjs(history.date));

    console.log(currentHabit?.id);

    const calenderDates : Record<string, {}> = {};

    dates?.forEach((date) => {
      calenderDates[date.format("YYYY-MM-DD")] = {
        selected: true,
      };
    });

    setCalendarDates(calenderDates);
  };

  const onHabitChange = (item: DropdownItem) => {
    setCurrentHabit(dropdownItemToHabit(item));
  };

  useEffect(() => {
    if (!user) return;

    const fetchHabits = async () => {
      const historyQuery = await getDocs(
        query(collection(db, "history"), where("userId", "==", user?.uid)),
      );

      const history = historyQuery.docs.map(
        (doc) =>
          ({
            id: doc.id,
            date: doc.data().date.toDate(),
            habitId: doc.data().habitId,
            userId: doc.data().userId,
          }) as History,
      );

      setHistory(history);
    };

    fetchHabits();
  }, [user]);

  useEffect(() => {
    const dates = history
      ?.filter((history) => history.habitId === currentHabit?.id)
      .map((history) => dayjs(history.date));

    const calenderDates: StringByString = {};

    dates?.forEach((date) => {
      calenderDates[date.format("YYYY-MM-DD")] = {
        selected: true,
      };
    });

    setCalendarDates(calenderDates);
  }, [currentHabit?.id, history]);

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
