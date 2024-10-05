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
import { Picker } from "@react-native-picker/picker";

const habitFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  notificationTime: z.enum(["sunrise", "sunset", "both"]),
  emailNotificationEnabled: z.boolean(),
  pushNotificationEnabled: z.boolean(),
});

type HabitFormValues = z.infer<typeof habitFormSchema>;

type HabitFormProps = NativeStackScreenProps<HabitStackParamList, "HabitForm">;

export default function HabitForm({ navigation }: HabitFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<HabitFormValues>({
    resolver: zodResolver(habitFormSchema),
    defaultValues: {
      notificationTime: "sunrise",
      emailNotificationEnabled: true,
      pushNotificationEnabled: true,
    },
  });

  const { addHabit } = useHabit();

  const user = useUser();

  if (!user) {
    return <Text>Please log in to add a habit</Text>;
  }

  const onSubmit: SubmitHandler<HabitFormValues> = async (data) => {
    const {
      name,
      notificationTime,
      emailNotificationEnabled,
      pushNotificationEnabled,
    } = data;

    addHabit({
      id: randomUUID(),
      userId: user.uid,
      name,
      notificationTime,
      emailNotificationEnabled,
      pushNotificationEnabled,
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
        name="notificationTime"
        render={({ field: { onChange, value } }) => (
          <Picker
            selectedValue={value}
            onValueChange={onChange}
            style={styles.picker}
          >
            <Picker.Item label="Sunrise" value="sunrise" />
            <Picker.Item label="Sunset" value="sunset" />
            <Picker.Item label="Both" value="both" />
          </Picker>
        )}
      />
      {errors.notificationTime && (
        <Text style={{ color: "red" }}>{errors.notificationTime.message}</Text>
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
