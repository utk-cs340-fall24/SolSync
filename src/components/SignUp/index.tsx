import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, db } from "../../../firebaseConfig";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { doc, setDoc } from "firebase/firestore";
import getLocationFromDevice from "@/utils/getLocationFromDevice";
import { z } from "zod";
import { SubmitHandler, Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import getFirebaseAuthErrorMessage from "@/utils/getFirebaseAuthErrorMessage";

import DropDownPicker from "react-native-dropdown-picker";

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
    const { email, password, displayName } = data;
    try {
      const credentials = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );

      const location = await getLocationFromDevice();

      setDoc(doc(db, "users", credentials.user.uid), {
        displayName,
        latitude: location.latitude,
        longitude: location.longitude,
      });
    } catch (error) {
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
        <Text style={{ marginBottom: 15 }}>Sign up for SolSync</Text>

        <Controller
          control={control}
          name="displayName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              autoCorrect={false}
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

        <Button
          title="Sign Up"
          color="purple"
          onPress={handleSubmit(onSubmit)}
        />

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
  },
  input: {
    height: 40,
    width: "70%",
    marginHorizontal: 12,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
