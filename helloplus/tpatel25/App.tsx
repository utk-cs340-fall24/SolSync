import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { auth } from "./firebaseConfig";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";

export default function App() {
  const [user, useUser] = useState<User>();
  const [email, useEmail] = useState("");
  const [password, usePassword] = useState("");
  const [errorMessage, useErrorMessage] = useState("");

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
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Creating an account");

        // set active user
        useUser(userCredential.user);
        
        // reset error message
        useErrorMessage("");
      })
      .catch((error) => {
        // store error message and display it to the user
        useErrorMessage(error.message);
      });
  };

  // login into an existing user from firebase
  const loginIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Logging in existing account");

        // set active user
        useUser(userCredential.user);

        // reset error message
        useErrorMessage("");
      })
      .catch((error) => {
        // store error message and display it to the user
        useErrorMessage(error.message);
      });
  };

  return (
    <View style={styles.container}>
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
      <Button title="Login In" onPress={loginIn} />
      {user && <Text>Hello, {user?.email}!</Text>}
      {errorMessage && <Text>{errorMessage}!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: "70%",
    marginHorizontal: 12,
    borderWidth: 1,
    padding: 10,
  },
});
