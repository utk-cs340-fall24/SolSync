import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { z } from "zod";

import { upsertUser } from "@/server";
import { SolSyncUser } from "@/types";
import getFirebaseAuthErrorMessage from "@/utils/getFirebaseAuthErrorMessage";
import getLocationFromDevice from "@/utils/getLocationFromDevice";

import { firebaseAuth } from "../../../firebaseConfig";

const signUpFormSchema = z.object({
  displayName: z.string().min(1, { message: "Display name is required" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export default function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    // Collect necessary information
    const { email, password, displayName } = data;

    // Add to firebase
    try {
      const credentials = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );

      const location = await getLocationFromDevice();

      const solSyncUser: SolSyncUser = {
        id: credentials.user.uid,
        email,
        location,
        displayName,
      };

      await upsertUser(solSyncUser, email, location, displayName);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError("root", {
          message: getFirebaseAuthErrorMessage(error.code),
        });
      }
    }

    // Send welcome email
    // Will only progress past this line if the user is not in firebase

    // Check if the URL is valid
    const apiUrl = process.env.EXPO_PUBLIC_SENDWELCOMEEMAIL_API_URL;

    // Check if the API URL is defined
    if (!apiUrl) {
      throw new Error(
        "SENDWELCOMEEMAIL_API_URL is not defined in the environment variables.",
      );
    }
    const url = new URL(apiUrl);

    // Adding query parameters by using to and name
    if (displayName && email) {
      url.searchParams.append("to", email.toString());
      url.searchParams.append("name", displayName.toString());

      console.log("Parameters successfully added.");
    } else {
      console.log("Unable to fetch email and name.");
    }

    // Try sending the email using a get request with the parameters
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-api-key": process.env
            .EXPO_PUBLIC_SENDWELCOMEEMAIL_API_KEY as string,
        },
      });

      // Check if the response was successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Console log
      console.log("Sent!");

      const jsonData = await response.json();

      // Print out success or error
      console.log(jsonData.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title]}>SolSync</Text>
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="displayName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                autoCorrect={false}
                autoCapitalize="words"
                style={styles.input}
                placeholder="Display Name"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />

          {errors.displayName && (
            <Text style={{ color: "red" }}>{errors.displayName.message}</Text>
          )}

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.email && (
            <Text style={{ color: "red" }}>{errors.email.message}</Text>
          )}

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.password && (
            <Text style={{ color: "red" }}>{errors.password.message}</Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        {errors.root && (
          <Text style={{ color: "red" }}>{errors.root.message}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#4a3f4c",
    marginBottom: 70,
    marginTop: -60,
  },
  gradientText: {
    padding: 10,
    borderRadius: 10,
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
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
  signUpButton: {
    backgroundColor: "#b38acb",
    width: "80%",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});