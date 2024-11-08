import dayjs from "dayjs";
import { randomUUID } from "expo-crypto";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
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
import { default as IonIcons } from "react-native-vector-icons/Ionicons";

import { useHabit } from "@/hooks/useHabit";
import useUser from "@/hooks/useUser";
import { sendDataEmail } from "@/server/emails";
import { getHistory } from "@/server/histories";
import { Habit, History } from "@/types";

import { db } from "../../../firebaseConfig";

type DropdownItem = {
  label: string;
  value: string;
};

export default function HistoryComponent() {
  const { user, userIsLoading } = useUser();
  const { habits } = useHabit();
  const [currentHabit, setCurrentHabit] = useState<Habit | undefined>(
    habits[0],
  );
  const [completedHabitHistory, setCompletedHabitHistory] =
    useState<History[]>();
  const [calendarDates, setCalendarDates] = useState<unknown>();
  const [habitsCompleted, setHabitsCompleted] =
    useState<Record<string, boolean>>();
  const [requestDataLoading, setRequestDataLoading] = useState(false);

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

  const upsertHistory = async (history: History) => {
    await setDoc(doc(db, "history", history.id), history);
  };

  const deleteHistory = async (history: History) => {
    await deleteDoc(doc(db, "history", history.id));
  };

  const addHistory = () => {
    if (!completedHabitHistory || !user || !currentHabit) return;

    const newHistory: History = {
      id: randomUUID(),
      date: dayjs().startOf("day").toDate(),
      habitId: currentHabit.id,
      userId: user.id,
    };

    setCompletedHabitHistory([...completedHabitHistory, newHistory]);

    upsertHistory(newHistory);
  };

  const removeHistory = () => {
    if (!completedHabitHistory || !user || !currentHabit) return;

    setCompletedHabitHistory(
      completedHabitHistory?.filter((history) => {
        if (
          !(
            history.userId === user.id &&
            history.habitId === currentHabit.id &&
            dayjs().isSame(history.date, "day")
          )
        ) {
          return true;
        }

        deleteHistory(history);

        return false;
      }),
    );
  };

  const handleSubmit = () => {
    if (!completedHabitHistory || !user || !currentHabit) return;

    if (habitsCompleted?.[currentHabit?.id]) {
      removeHistory();
    } else {
      addHistory();
    }
  };

  const isHabitCompletedToday = (habit: Habit) => {
    if (!completedHabitHistory) {
      return false;
    }

    return completedHabitHistory.some((history) => {
      const isHistoryToday = dayjs().isSame(history.date, "day");
      const isCurrentHabit = habit.id === history.habitId;

      return isCurrentHabit && isHistoryToday;
    });
  };

  useEffect(() => {
    const newHabitsCompleted: Record<string, boolean> = {};

    habits.forEach((habit) => {
      newHabitsCompleted[habit.id] = isHabitCompletedToday(habit);
    });

    setHabitsCompleted(newHabitsCompleted);
    setCurrentHabit(habits[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [habits, completedHabitHistory]);

  useEffect(() => {
    if (!user) return;

    const fetchHistory = async () => {
      const history = await getHistory(user);
      setCompletedHabitHistory(history);
    };

    fetchHistory();
  }, [user]);

  useEffect(() => {
    const dates = completedHabitHistory
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
  }, [currentHabit?.id, completedHabitHistory]);

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
        <Text style={styles.title}>History</Text>
        <Text style={styles.LogIn}>Log in to view your history</Text>
      </View>
    );
  }
  const requestDataEmail = async () => {
    setRequestDataLoading(true);

    await sendDataEmail(user);

    setRequestDataLoading(false);
  };

  if (habits.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.header1}>History</Text>
        <Text style={styles.noHabitText}>Add a habit to get started</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header2}>History</Text>
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
      {currentHabit && habitsCompleted && (
        <TouchableOpacity
          style={
            habitsCompleted[currentHabit?.id]
              ? styles.undoHabitButton
              : styles.completeHabitButton
          }
          onPress={handleSubmit}
        >
          <IonIcons
            name="checkmark-circle-outline"
            size={25}
            color="white"
            style={{ marginHorizontal: 3 }}
          />
          <Text style={styles.buttonText}>
            {habitsCompleted[currentHabit?.id]
              ? "Undo Habit"
              : "Complete Habit"}
          </Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.requestDateButton}
        onPress={requestDataEmail}
      >
        {requestDataLoading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <FAIcon
            name="envelope-o"
            size={25}
            color="white"
            style={{ marginHorizontal: 6 }}
          ></FAIcon>
        )}
        <Text style={styles.buttonText}>Request Your History</Text>
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
  header1: {
    fontSize: 30,
    paddingBottom: 40,
    marginTop: -280,
    color: "#4a3f4c",
  },
  noHabitText: {
    fontSize: 18,
    color: "#4a3f4c",
    marginTop: 240,
  },
  header2: {
    fontSize: 30,
    paddingBottom: 40,
    marginTop: "25%",
    marginBottom: 20,
    color: "#4a3f4c",
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
  undoHabitButton: {
    backgroundColor: "#f4a58a",
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
  requestDateButton: {
    backgroundColor: "#f4a58a", // Light purple color
    width: "95%",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "20%",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderRadius: 8,
    paddingHorizontal: 16,
    width: "95%",
    backgroundColor: "#fff",
  },
  title: {
    alignItems: "center",
    fontSize: 30,
    paddingBottom: 40,
    marginTop: -280,
    color: "#4a3f4c",
  },
  LogIn: {
    fontSize: 20,
    marginTop: 240,
    color: "#4a3f4c",
    alignItems: "center",
  },
});
