import { zodResolver } from "@hookform/resolvers/zod";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
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
    return <Text>Please log in to edit a habit</Text>;
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
      userId: user.id,
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
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Edit Habit</Text>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.habitNameHeader}>Habit Name</Text>
        </View>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              autoCorrect={false}
              style={styles.nameInput}
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
        <View style={styles.titleContainer}>
          <Text style={styles.habitTimeHeader}>Habit Time</Text>
        </View>
        <Controller
          control={control}
          name="notificationPeriod"
          render={({ field: { onChange, value } }) => (
            <Dropdown
              data={[
                { label: "  Sunrise", value: "sunrise" },
                { label: "  Sunset", value: "sunset" },
              ]}
              onChange={(item) => onChange(item.value)}
              style={styles.timePicker}
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

        <Text style={styles.offsetHeader}>Offset</Text>
        <View style={styles.sectionContainer}>
          <Controller
            control={control}
            name="offsetDirection"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                data={[
                  {
                    label: `  Before ${notificationPeriod}`,
                    value: "before",
                  },
                  { label: `  After ${notificationPeriod}`, value: "after" },
                ]}
                onChange={(item) => onChange(item.value)}
                style={styles.offsetPicker}
                value={value}
                labelField={"label"}
                valueField={"value"}
              />
            )}
          />
          {errors.offsetDirection && (
            <Text style={{ color: "red" }}>
              {" "}
              {errors.offsetDirection.message}
            </Text>
          )}
          <View style={styles.offsetDivider} />
          <View style={styles.offsetRow}>
            <View style={styles.offsetColumns}>
              <Text style={styles.timeHeader}>Hour</Text>
              <Controller
                control={control}
                name="hourOffset"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    autoCorrect={false}
                    style={styles.timeInput}
                    placeholder="Hour offset"
                    onChangeText={(text) => onChange(Number(text))}
                    onBlur={onBlur}
                    keyboardType="numeric"
                    value={String(value)}
                  />
                )}
              />
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.offsetColumns}>
              <Text style={styles.timeHeader}>Minute</Text>
              <Controller
                control={control}
                name="minuteOffset"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    autoCorrect={false}
                    style={styles.timeInput}
                    placeholder="Minute offset"
                    onChangeText={(text) => onChange(Number(text))}
                    onBlur={onBlur}
                    keyboardType="numeric"
                    value={String(value)}
                  />
                )}
              />
            </View>
          </View>
        </View>
        {errors.hourOffset && (
          <Text style={{ color: "red" }}>{errors.hourOffset.message}</Text>
        )}
        {errors.minuteOffset && (
          <Text style={{ color: "red" }}>{errors.minuteOffset.message}</Text>
        )}

        <View style={styles.emailRow}>
          <Text style={styles.emailText}>Email Notifications</Text>
          <Controller
            control={control}
            name="emailNotificationEnabled"
            render={({ field: { onChange, value } }) => (
              <Switch
                trackColor={{ false: "#767577", true: "#F4A58A" }}
                thumbColor={value ? "#FFFFFF" : "#FFFFFF"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={onChange}
                value={value}
              />
            )}
          />
        </View>
        {errors.emailNotificationEnabled && (
          <Text style={{ color: "red" }}>
            {errors.emailNotificationEnabled.message}
          </Text>
        )}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.navigate("HabitList")}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(habit)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.updateHabitButton}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Update Habit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionContainer: {
    paddingHorizontal: 0,
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4a3f4c",
    marginTop: -35,
  },
  habitNameHeader: {
    fontSize: 18,
    marginTop: 10,
    alignSelf: "flex-start",
    marginLeft: -155,
    color: "#5A5A5A",
  },
  nameInput: {
    height: 45,
    width: "80%",
    marginHorizontal: 12,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: "#ccc",
    fontSize: 16,
    backgroundColor: "#FFFFFF",
  },
  habitTimeHeader: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "flex-start",
    marginLeft: -155,
    color: "#5A5A5A",
  },
  timeInput: {
    height: 40,
    width: 40,
    maxWidth: 40,
    textAlign: "center",
    marginHorizontal: 55,
    margin: 10,
    borderWidth: 1,
    paddingHorizontal: 5,
    borderRadius: 8,
    borderColor: "#ccc",
    backgroundColor: "#FFFFFF",
    fontSize: 15,
  },
  timeHeader: {
    fontSize: 20,
  },
  emailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: "#ccc",
    height: 50,
    width: "80%",
    backgroundColor: "#FFFFFF",
  },
  emailText: {
    fontSize: 18,
    marginRight: 80,
  },
  offsetHeader: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    alignSelf: "flex-start",
    marginLeft: 40,
    color: "#5A5A5A",
  },
  offsetPicker: {
    width: "100%",
    height: 30,
  },
  timePicker: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    backgroundColor: "#FFFFFF",
  },
  offsetDivider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  offsetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  offsetColumns: {
    alignItems: "center",
  },
  colon: {
    fontSize: 40,
    alignSelf: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  updateHabitButton: {
    backgroundColor: "#b38acb",
    width: "80%",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
    marginBottom: -30,
  },
  deleteButton: {
    backgroundColor: "#f4a58a",
    width: "37%",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: "#f4a58a",
    width: "37%",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    marginRight: 10,
  },
});
