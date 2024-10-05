import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../../firebaseConfig";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { FirebaseError } from "firebase/app";
import getFirebaseAuthErrorMessage from "@/utils/getFirebaseAuthErrorMessage";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginForm = z.infer<typeof loginFormSchema>;

export default function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    const { email, password } = data;

    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
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
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ marginBottom: 15 }}>Hello! Please sign in</Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              autoCorrect={false}
              style={styles.input}
              placeholder="Email"
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
          title="Sign In"
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
  input: {
    height: 40,
    width: "70%",
    marginHorizontal: 12,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
