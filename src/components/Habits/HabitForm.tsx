import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HabitStackParamList } from ".";
import { z } from "zod";
import { useHabit } from "@/hooks/useHabit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import useUser from "@/hooks/useUser";
import {
  Button,
  Keyboard,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { randomUUID } from "expo-crypto";
import { SafeAreaView, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const habitFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  notificationPeriod: z.enum(["sunrise", "sunset"]),
  emailNotificationEnabled: z.boolean(),
  pushNotificationEnabled: z.boolean(),
  hourOffset: z
    .number()
    .min(0, { message: "Hour offset must be a positive number" })
    .max(6, { message: "Hour offset must be less than 6" })
    .optional(),
  minuteOffset: z
    .number()
    .min(0, { message: "Minute offset must be a positive number" })
    .max(59, { message: "Minute offset must be less than 60" })
    .optional(),
  offsetDirection: z.enum(["before", "after"]).optional(),
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
      name: "",
      notificationPeriod: "sunrise",
      emailNotificationEnabled: true,
      pushNotificationEnabled: true,
      minuteOffset: 0,
      hourOffset: 0,
      offsetDirection: "before",
    },
  });

  const emailNotificationEnabled = watch("emailNotificationEnabled");
  const pushNotificationEnabled = watch("pushNotificationEnabled");
  const notificationPeriod = watch("notificationPeriod");

  const showTimeControls = emailNotificationEnabled || pushNotificationEnabled;

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
      hourOffset,
      minuteOffset,
      offsetDirection,
    } = data;

    console.log(data);

    addHabit({
      id: randomUUID(),
      userId: user.uid,
      name,
      notificationPeriod,
      emailNotificationEnabled,
      pushNotificationEnabled,
      hourOffset,
      minuteOffset,
      offsetDirection,
    });

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

        {showTimeControls && (
          <>
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
              <Text style={{ color: "red" }}>
                {errors.minuteOffset.message}
              </Text>
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
              <Text style={{ color: "red" }}>
                {errors.offsetDirection.message}
              </Text>
            )}
          </>
        )}

        <Button
          title="Add Habit"
          color="purple"
          onPress={handleSubmit(onSubmit)}
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
