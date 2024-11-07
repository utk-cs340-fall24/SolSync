import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { default as FeatherIcon } from "react-native-vector-icons/Feather";
import { default as IonIcons } from "react-native-vector-icons/Ionicons";

import { useHabit } from "@/hooks/useHabit";

import { HabitStackParamList } from ".";

type HabitListProps = NativeStackScreenProps<HabitStackParamList, "HabitList">;

export default function HabitList({ navigation }: HabitListProps) {
  const { habits } = useHabit();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title]}>My Habits</Text>
      </View>
      <FlatList
        data={habits}
        contentContainerStyle={styles.habitsList}
        renderItem={({ item }) => {
          let habitTimeMessage = "";

          if (item.hourOffset !== 0) {
            habitTimeMessage += `${item.hourOffset} ${item.hourOffset === 1 ? "hour" : "hours"}`;
          }

          if (item.minuteOffset !== 0) {
            if (habitTimeMessage !== "") habitTimeMessage += " ";
            habitTimeMessage += `${item.minuteOffset} ${item.minuteOffset === 1 ? "minute" : "minutes"}`;
          }

          habitTimeMessage += ` ${item.offsetDirection} ${item.notificationPeriod}`;

          if (item.minuteOffset === 0 && item.hourOffset === 0) {
            habitTimeMessage = `At ${item.notificationPeriod}`;
          }

          return (
            <View style={styles.habitCard}>
              <View>
                <Text style={styles.habitTitle}>{item.name}</Text>
                <Text style={styles.habitTime}>{habitTimeMessage}</Text>
              </View>
              <TouchableOpacity style={styles.editIcon}>
                <FeatherIcon
                  name="edit-3"
                  size={25}
                  color="#5A5A5A"
                  onPress={() =>
                    navigation.navigate("EditHabitForm", { habit: item })
                  }
                ></FeatherIcon>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.addHabitButton}
          onPress={() => navigation.navigate("AddHabitForm")}
        >
          <IonIcons
            name="add-circle-outline"
            size={20}
            color="white"
            style={{ marginHorizontal: 6 }}
          />
          <Text style={styles.buttonText}>Add Habit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    color: "#4a3f4c",
    marginBottom: 30,
    marginTop: 17,
  },
  habitsList: {
    paddingBottom: 80,
    alignItems: "center",
  },
  habitCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderColor: "#ccc",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    width: "97%",
    height: 80,
    marginBottom: 20,
  },
  habitTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#4a3f4c",
    marginBottom: 5,
  },
  habitTime: {
    fontSize: 14,
    color: "#333",
  },
  editIcon: {
    padding: 8,
  },
  addHabitButton: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#b38acb",
    padding: 10,
    marginTop: "auto",
    marginBottom: 20,
    width: "95%",
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
});
