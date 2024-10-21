import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  Button,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";

import { useHabit } from "@/hooks/useHabit";

import { HabitStackParamList } from ".";

type HabitListProps = NativeStackScreenProps<HabitStackParamList, "HabitList">;

export default function HabitList({ navigation }: HabitListProps) {
  const { habits } = useHabit();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={habits}
        renderItem={({ item }) => (
          <Button
            title={item.name}
            color="purple"
            onPress={() =>
              navigation.navigate("EditHabitForm", { habit: item })
            }
          />
        )}
      />
      <Pressable
        style={{
          backgroundColor: "purple",
          padding: 10,
          marginTop: "auto",
          marginBottom: 20,
          width: "80%",
          alignSelf: "center",
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate("AddHabitForm")}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Add Habit</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
