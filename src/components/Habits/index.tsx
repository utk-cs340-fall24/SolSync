import useUser from "@/hooks/useUser";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, StyleSheet, Text } from "react-native";
import HabitList from "./HabitList";
import HabitForm from "./HabitForm";

export type HabitStackParamList = {
  HabitList: undefined;
  HabitForm: undefined;
};

const Stack = createNativeStackNavigator<HabitStackParamList>();

export default function Habits() {
  const user = useUser();

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Please sign in to view your habits</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="HabitList" component={HabitList} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="HabitForm" component={HabitForm} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
