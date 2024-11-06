import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native";

import useUser from "@/hooks/useUser";
import { Habit } from "@/types";

import AddHabitForm from "./AddHabitForm";
import EditHabitForm from "./EditHabitForm";
import HabitList from "./HabitList";

export type HabitStackParamList = {
  HabitList: undefined;
  AddHabitForm: undefined;
  EditHabitForm: { habit: Habit };
};

const Stack = createNativeStackNavigator<HabitStackParamList>();

export default function Habits() {
  const { user, userIsLoading } = useUser();

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
        <Text style={styles.title}>My Habits</Text>
        <Text style={styles.LogIn}>Log in to view your habits</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="HabitList" component={HabitList} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="AddHabitForm" component={AddHabitForm} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="EditHabitForm" component={EditHabitForm} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    alignItems: "center",
    fontSize: 30,
    paddingBottom: 40,
    marginTop: -300,
    color: "#4a3f4c",
  },
  LogIn: {
    fontSize: 20,
    marginTop: 240,
    color: "#4a3f4c",
    alignItems: "center",
  },
});
