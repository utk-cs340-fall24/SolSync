import { zodResolver } from "@hookform/resolvers/zod";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Button,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { z } from "zod";

import { useHabit } from "@/hooks/useHabit";
import useUser from "@/hooks/useUser";
import { Habit } from "@/types";

import { HabitStackParamList } from ".";

const editHabitFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  notificationPeriod: z.enum(["sunrise", "sunset"]),
  emailNotificationEnabled: z.boolean(),
  hourOffset: z
    .number()
    .min(0, { message: "Hour offset must be a positive number" })
    .max(6, { message: "Hour offset must be less than 6" }),
  minuteOffset: z
    .number()
    .min(0, { message: "Minute offset must be a positive number" })
    .max(59, { message: "Minute offset must be less than 60" }),
  offsetDirection: z.enum(["before", "after"]),
});

type EditHabitFormValues = z.infer<typeof editHabitFormSchema>;

type EditHabitFormProps = NativeStackScreenProps<
  HabitStackParamList,
  "EditHabitForm"
>;

export default function EditHabitForm({
  navigation,
  route,
}: EditHabitFormProps) {
  const { habit } = route.params;

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<EditHabitFormValues>({
    resolver: zodResolver(editHabitFormSchema),
    defaultValues: {
      name: habit.name,
      notificationPeriod: habit.notificationPeriod,
      emailNotificationEnabled: habit.emailNotificationEnabled,
      hourOffset: habit.hourOffset,
      minuteOffset: habit.minuteOffset,
      offsetDirection: habit.offsetDirection,
    },
  });

  const notificationPeriod = watch("notificationPeriod");

  const { updateHabit, removeHabit } = useHabit();

  const { user, userIsLoading } = useUser();

  if (userIsLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#000000" />
      </View>
    );
  }

  if (!user) {
    return <Text>Please log in to add a habit</Text>;
  }

  const onSubmit: SubmitHandler<EditHabitFormValues> = async (data) => {
    const {
      name,
      notificationPeriod,
      emailNotificationEnabled,
      hourOffset,
      minuteOffset,
      offsetDirection,
    } = data;

    await updateHabit({
      id: habit.id,
      userId: user.uid,
      name,
      notificationPeriod,
      emailNotificationEnabled,
      hourOffset,
      minuteOffset,
      offsetDirection,
    });

    navigation.navigate("HabitList");
  };

  const handleDelete = async (habit: Habit) => {
    await removeHabit(habit);
    navigation.navigate("HabitList");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <Text>Add a habit</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              autoCorrect={false}
              style={styles.input}
              placeholder="Name"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {errors.name && (
          <Text style={{ color: "red" }}>{errors.name.message}</Text>
        )}
        <Controller
          control={control}
          name="notificationPeriod"
          render={({ field: { onChange, value } }) => (
            <Dropdown
              data={[
                { label: "Sunrise", value: "sunrise" },
                { label: "Sunset", value: "sunset" },
              ]}
              onChange={(item) => onChange(item.value)}
              style={styles.picker}
              value={value}
              labelField={"label"}
              valueField={"value"}
            />
          )}
        />
        {errors.notificationPeriod && (
          <Text style={{ color: "red" }}>
            {errors.notificationPeriod.message}
          </Text>
        )}

        <Text>Email Notifications</Text>
        <Controller
          control={control}
          name="emailNotificationEnabled"
          render={({ field: { onChange, value } }) => (
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={value ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={onChange}
              value={value}
            />
          )}
        />
        {errors.emailNotificationEnabled && (
          <Text style={{ color: "red" }}>
            {errors.emailNotificationEnabled.message}
          </Text>
        )}

        <Text>Hour offset</Text>
        <Controller
          control={control}
          name="hourOffset"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              autoCorrect={false}
              style={styles.input}
              placeholder="Hour offset"
              onChangeText={(text) => onChange(Number(text))}
              onBlur={onBlur}
              keyboardType="numeric"
              value={String(value)}
            />
          )}
        />
        {errors.hourOffset && (
          <Text style={{ color: "red" }}>{errors.hourOffset.message}</Text>
        )}

        <Text>Minute offset</Text>
        <Controller
          control={control}
          name="minuteOffset"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              autoCorrect={false}
              style={styles.input}
              placeholder="Minute offset"
              onChangeText={(text) => onChange(Number(text))}
              onBlur={onBlur}
              keyboardType="numeric"
              value={String(value)}
            />
          )}
        />
        {errors.minuteOffset && (
          <Text style={{ color: "red" }}>{errors.minuteOffset.message}</Text>
        )}

        <Text>Offset direction</Text>
        <Controller
          control={control}
          name="offsetDirection"
          render={({ field: { onChange, value } }) => (
            <Dropdown
              data={[
                {
                  label: `Before ${notificationPeriod}`,
                  value: "before",
                },
                { label: `After ${notificationPeriod}`, value: "after" },
              ]}
              onChange={(item) => onChange(item.value)}
              style={styles.picker}
              value={value}
              labelField={"label"}
              valueField={"value"}
            />
          )}
        />
        {errors.offsetDirection && (
          <Text style={{ color: "red" }}>{errors.offsetDirection.message}</Text>
        )}

        <Button
          title="Update Habit"
          color="purple"
          onPress={handleSubmit(onSubmit)}
        />

        <Button
          title="Delete"
          color="purple"
          onPress={() => handleDelete(habit)}
        />

        <Button
          title="Cancel"
          color="purple"
          onPress={() => navigation.navigate("HabitList")}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: "70%",
    marginHorizontal: 12,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  picker: {
    width: "70%",
    borderWidth: 1,
  },
});
