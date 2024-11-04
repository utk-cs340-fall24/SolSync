import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { default as FeatherIcon } from "react-native-vector-icons/Feather";

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
        renderItem={({ item }) => (
          <View style={styles.habitCard}>
            <View>
              <Text style={styles.habitTitle}>{item.name}</Text>
              <Text style={styles.habitTime}>
                Habit Time: {item.notificationPeriod}
              </Text>
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
        )}
      />
      <Pressable
        style={styles.addHabitButton}
        onPress={() => navigation.navigate("AddHabitForm")}
      >
        <Text style={styles.buttonText}>Add Habit</Text>
      </Pressable>
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
    fontWeight: "bold",
    color: "#4a3f4c",
    marginBottom: 30,
    marginTop: 20,
  },
  habitsList: {
    paddingHorizontal: 16,
    paddingBottom: 80,
    alignItems: "center",
  },
  habitCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderColor: "#ccc",
    color: "#4a3f4c",
    borderWidth: 1,
    borderRadius: 8,
    width: "95%",
    height: 80,
    marginBottom: 20,
  },
  habitTitle: {
    fontSize: 23,
    fontWeight: "600",
    color: "#000",
    marginBottom: 5,
  },
  habitTime: {
    fontSize: 16,
    color: "#333",
  },
  editIcon: {
    padding: 8,
  },
  addHabitButton: {
    backgroundColor: "#b38acb",
    padding: 10,
    marginTop: "auto",
    marginBottom: 20,
    width: "80%",
    alignSelf: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
