import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { firebaseAuth } from "../../../firebaseConfig";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import useUser from "@/hooks/useUser";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const user = useUser();

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const signOut = () => {
    firebaseSignOut(firebaseAuth);
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
        {user ? (
          <>
            <Button title="Sign Out" onPress={signOut} />
            <Text>Hello, {user.email}! You are logged in!</Text>
          </>
        ) : (
          <>
            <Text style={{ marginBottom: 15 }}>Hello! Please sign in</Text>
            <TextInput
              autoCorrect={false}
              style={styles.input}
              placeholder="Email"
              onChangeText={setEmail}
              value={email}
            />
            <TextInput
              autoCorrect={false}
              secureTextEntry={true}
              style={styles.input}
              placeholder="Password"
              onChangeText={setPassword}
              value={password}
            />
            <Button title="Log In" color="purple" onPress={signIn} />
          </>
        )}
        {error && <Text>{error}</Text>}
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
