import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../../firebaseConfig";
import { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import useUser from "@/hooks/useUser";
import useLocation from "@/hooks/useLocation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useUser();
  const [location] = useLocation();
  const [error, setError] = useState("");

  // create an account with there email and password
  const createAccount = async () => {
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      setError("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        return;
      }
    }
  };

  const signUp = async () => {
    // create account with email and password
    createAccount();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Sign up for SolSync</Text>
      <Text>Email</Text>
      <TextInput
        autoCorrect={false}
        style={styles.input}
        onChangeText={setEmail}
        value={email}
      />
      <Text>Password</Text>
      <TextInput
        autoCorrect={false}
        secureTextEntry={true}
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />
      <Button title="Sign Up" onPress={signUp} />
      {user && <Text>Hello, {user?.email}! Thank You for signing up!</Text>}
      {error && <Text>{error}</Text>}
      {location && (
        <Text>
          {location.latitude}, {location.longitude}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "70%",
    marginHorizontal: 12,
    borderWidth: 1,
    padding: 10,
  },
});
