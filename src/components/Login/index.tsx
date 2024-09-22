import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseAuth } from "../../../firebaseConfig";
import { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import useUser from "@/hooks/useUser";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const user = useUser();

  // login into an existing user from firebase
  const userLogin = () => {
    signInWithEmailAndPassword(firebaseAuth, email, password).catch((error) => {
      // store error message and display it to the user
      setError(error.message);
    });
  };

  // sign out of the current user
  const userSignOut = () => {
    signOut(firebaseAuth);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {user ? (
        <>
          <Button title="Sign Out" onPress={userSignOut} />
          <Text>Hello, {user?.email}! You are logged in!</Text>
        </>
      ) : (
        <>
          <Text>Login into SolSync</Text>
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
          <Button title="Login" onPress={userLogin} />
        </>
      )}
      {error && <Text>{error}</Text>}
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
