import { zodResolver } from "@hookform/resolvers/zod";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { z } from "zod";

import useUser from "@/hooks/useUser";
import { setUser } from "@/server";

import { ProfileStackParamList } from ".";

const editProfileFormSchema = z.object({
  displayName: z.string().min(1, { message: "Name is required" }),
});

type EditProfileFormValues = z.infer<typeof editProfileFormSchema>;

type EditProfileScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  "EditProfile"
>;

export default function EditProfile({ navigation }: EditProfileScreenProps) {
  const [user, userIsLoading] = useUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      displayName: user?.displayName,
    },
  });

  if (userIsLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#000000" />
      </View>
    );
  }

  if (!user) {
    return;
  }

  const onSubmit: SubmitHandler<EditProfileFormValues> = async (data) => {
    const { displayName } = data;

    await setUser(user, user.location, displayName);
    navigation.navigate("AuthorizedProfile");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Edit Profile</Text>

        <Text style={styles.fieldTitle}>Name</Text>
        <Controller
          control={control}
          name="displayName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              autoCorrect={false}
              autoCapitalize="words"
              style={styles.input}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />

        {errors.displayName && (
          <Text style={{ color: "red" }}>{errors.displayName.message}</Text>
        )}

        <Text>Icon picker here</Text>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.navigate("AuthorizedProfile")}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
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
    padding: "2%",
  },
  header: {
    fontSize: 24,
    paddingBottom: "10%",
    marginTop: -50,
  },
  fieldTitle: {
    paddingLeft: "10%",
    fontSize: 18,
    alignSelf: "flex-start",
    marginBottom: "3%",
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: "3%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "#b38acb", // Light purple color
    width: "80%",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  cancelButton: {
    backgroundColor: "#f4a58a", // Light orange color
    width: "80%",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
});
