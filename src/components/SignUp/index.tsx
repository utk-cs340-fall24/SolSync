import { User, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../../firebaseConfig";
import { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";

export default function SignUp() {
  const [email, useEmail] = useState("");
  const [password, usePassword] = useState("");
  const [user, useUser] = useState<User>();
  const [error, useError] = useState("");

  const signUp = () => {
    // check for valid email
    if (email === undefined) {
      console.log("Please type in a email");
      return;
    }

    // check for valid password
    if (password === undefined) {
      console.log("Please type in an password");
      return;
    }

    // create a new user in firebase
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        console.log("Creating an account");

        // set active user
        useUser(userCredential.user);

        // reset error message
        useError("");
      })
      .catch((error) => {
        // store error message and display it to the user
        useError(error.message);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Sign up for SolSync</Text>
      <Text>Email</Text>
      <TextInput
        autoCorrect={false}
        style={styles.input}
        onChangeText={useEmail}
        value={email}
      />
      <Text>Password</Text>
      <TextInput
        autoCorrect={false}
        secureTextEntry={true}
        style={styles.input}
        onChangeText={usePassword}
        value={password}
      />
      <Button title="Sign Up" onPress={signUp} />
      {user && <Text>Hello, {user?.email}! Thank You for signing up!</Text>}
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
