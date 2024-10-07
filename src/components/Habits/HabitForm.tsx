import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HabitStackParamList } from ".";
import { z } from "zod";
import { useHabit } from "@/hooks/useHabit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import useUser from "@/hooks/useUser";
import { Button, Switch, Text, TextInput } from "react-native";
import { randomUUID } from "expo-crypto";
import { SafeAreaView, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const habitFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  notificationPeriod: z.enum(["sunrise", "sunset", "both"]),
  emailNotificationEnabled: z.boolean(),
  pushNotificationEnabled: z.boolean(),
  hasExactNotificationTime: z.boolean(),
  exactNotificationTime: z.date(),
});

type HabitFormValues = z.infer<typeof habitFormSchema>;

type HabitFormProps = NativeStackScreenProps<HabitStackParamList, "HabitForm">;

export default function HabitForm({ navigation }: HabitFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<HabitFormValues>({
    resolver: zodResolver(habitFormSchema),
    defaultValues: {
      notificationPeriod: "sunrise",
      emailNotificationEnabled: true,
      pushNotificationEnabled: true,
      hasExactNotificationTime: false,
      exactNotificationTime: new Date(),
    },
  });
  const hasExactNotificationTime = watch("hasExactNotificationTime");

  const { addHabit } = useHabit();

  const user = useUser();

  if (!user) {
    return <Text>Please log in to add a habit</Text>;
  }

  const onSubmit: SubmitHandler<HabitFormValues> = async (data) => {
    const {
      name,
      notificationPeriod,
      emailNotificationEnabled,
      pushNotificationEnabled,
      hasExactNotificationTime,
      exactNotificationTime,
    } = data;

    const isoTime = exactNotificationTime.toISOString();

    console.log(data);

    addHabit({
      id: randomUUID(),
      userId: user.uid,
      name,
      notificationPeriod,
      emailNotificationEnabled,
      pushNotificationEnabled,
      hasExactNotificationTime,
      exactNotificationTime: isoTime,
    });

    navigation.navigate("HabitList");
  };

  return (
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
              { label: "Both", value: "both" },
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
      <Text>Push Notifications</Text>
      <Controller
        control={control}
        name="pushNotificationEnabled"
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
      {errors.pushNotificationEnabled && (
        <Text style={{ color: "red" }}>
          {errors.pushNotificationEnabled.message}
        </Text>
      )}
      <Text>Exact Notification Time</Text>
      <Controller
        control={control}
        name="hasExactNotificationTime"
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

      {errors.hasExactNotificationTime && (
        <Text style={{ color: "red" }}>
          {errors.hasExactNotificationTime.message}
        </Text>
      )}

      {hasExactNotificationTime && (
        <Controller
          control={control}
          name="exactNotificationTime"
          render={({ field: { onChange, value } }) => (
            <RNDateTimePicker
              value={value}
              mode="time"
              is24Hour={true}
              onChange={(event, selectedDate) => {
                onChange(selectedDate);
              }}
            />
          )}
        />
      )}

      {errors.exactNotificationTime && (
        <Text style={{ color: "red" }}>
          {errors.exactNotificationTime.message}
        </Text>
      )}

      <Button
        title="Add Habit"
        color="purple"
        onPress={handleSubmit(onSubmit)}
      />
    </SafeAreaView>
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
