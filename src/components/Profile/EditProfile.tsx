import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { z } from "zod";

import { ProfileStackParamList } from ".";

const editProfileFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

type EditProfileFormValues = z.infer<typeof editProfileFormSchema>;

type EditProfileScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  "EditProfile"
>;

export default function EditProfile({ navigation }: EditProfileScreenProps) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Edit Profile</Text>
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
    padding: 16,
  },
  header: {
    fontSize: 24,
    paddingBottom: 40,
    marginTop: 20,
  },
  inputContainer: {
    width: "95%",
    padding: 25,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15, // Spacing below the box
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "#b38acb", // Light purple color
    width: "100%",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  createAccountButton: {
    backgroundColor: "#f4a58a", // Light orange color
    width: "80%",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
});
