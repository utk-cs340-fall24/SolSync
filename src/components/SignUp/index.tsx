import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, db } from "../../../firebaseConfig";
import { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import useUser from "@/hooks/useUser";
import { doc, setDoc } from "firebase/firestore";
import {
  getLastKnownPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useUser();
  const [error, setError] = useState("");

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password).then(
        async (cred) => {
          // if permission is granted, get the current location
          const location = await getLocation();

          setDoc(doc(db, "users", cred.user.uid), {
            latitude: location?.latitude || 0,
            longitude: location?.longitude || 0,
          });
        },
      );
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        return;
      }
    }
  };

  const getLocation = async (): Promise<
    undefined | { latitude: number; longitude: number }
  > => {
    const userLocation = {
      latitude: 0,
      longitude: 0,
    };

    // request permission for foreground location
    const { status } = await requestForegroundPermissionsAsync();

    // if permission is not granted, set an error and return
    if (status !== "granted") {
      return;
    }

    // if permission is granted, get the current location
    const location = await getLastKnownPositionAsync({});

    userLocation.latitude = location?.coords.latitude || 0;
    userLocation.longitude = location?.coords.longitude || 0;

    return userLocation;
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
