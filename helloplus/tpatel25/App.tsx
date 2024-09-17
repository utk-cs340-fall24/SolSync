import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { User } from "firebase/auth";

export default function App() {
  const [user, useUser] = useState<User>();
  const [email, useEmail] = useState('');
  const [password, usePassword] = useState('');

  const signUp = () => {
    if (email === undefined) {
      console.log("Please type in a email");
      return;
    }

    if (password === undefined) {
      console.log("Please type in an password");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        useUser(userCredential.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput style={styles.input} onChangeText={useEmail} value={email} />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={usePassword}
        value={password}
      />
      <Button title="Sign Up" onPress={signUp} />
      {user && <Text>Hello, {user?.email}!</Text>}
      <StatusBar style="auto" />
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
    width: "50%",
    marginHorizontal: 12,
    borderWidth: 1,
    padding: 10,
  },
});
