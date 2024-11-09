import { zodResolver } from "@hookform/resolvers/zod";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FirebaseError } from "firebase/app";
import { updatePassword } from "firebase/auth";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { z } from "zod";

import useUser from "@/hooks/useUser";
import getFirebaseAuthErrorMessage from "@/utils/getFirebaseAuthErrorMessage";

import { firebaseAuth } from "../../../firebaseConfig";
import { ProfileStackParamList } from ".";

type ChangePasswordPageProps = NativeStackScreenProps<
  ProfileStackParamList,
  "ChangePassword"
>;

const changePasswordFormSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

type ChangePasswordFormValues = z.infer<typeof changePasswordFormSchema>;

export default function ChangePassword({
  navigation,
}: ChangePasswordPageProps) {
  const { user, userIsLoading } = useUser();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordFormSchema),
  });

  if (userIsLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#000000" />
      </View>
    );
  }

  if (!user) {
    return <Text>Please log in to view your profile</Text>;
  }

  const onSubmit: SubmitHandler<ChangePasswordFormValues> = async (data) => {
    const { newPassword } = data;

    try {
      const user = firebaseAuth.currentUser;

      if (!user) {
        return;
      }

      await updatePassword(user, newPassword);
      navigation.navigate("AuthorizedProfile");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        setError("root", {
          message: getFirebaseAuthErrorMessage(error.code),
        });
      }
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>SolSync</Text>
        </View>

        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="newPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                style={styles.input}
                placeholder="New Password"
                placeholderTextColor="gray"
                secureTextEntry
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />

          {errors.newPassword && (
            <Text style={{ color: "red" }}>{errors.newPassword.message}</Text>
          )}

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                style={styles.input}
                placeholder="Confirm New Password"
                placeholderTextColor="gray"
                secureTextEntry
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />

          {errors.confirmPassword && (
            <Text style={{ color: "red" }}>
              {errors.confirmPassword.message}
            </Text>
          )}

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText}>Change password</Text>
          </TouchableOpacity>

          {errors.root && (
            <Text style={{ color: "red" }}>{errors.root.message}</Text>
          )}
        </View>
      </View>
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
  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#4a3f4c",
    marginBottom: 90,
    marginTop: -40,
  },
  inputContainer: {
    width: "95%",
    padding: 25,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
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
    color: "black",
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
});
