import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import useUser from "@/hooks/useUser";

import LogIn from "../LogIn";
import SignUp from "../SignUp";
import AuthorizedProfile from "./AuthorizedProfile";

export type ProfileStackParamList = {
  LogIn: undefined;
  SignUp: undefined;
  AuthorizedProfile: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function Profile() {
  const userObject = useUser();

  if (userObject.userIsLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#000000" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerTitle: "" }}>
      {userObject.user ? (
        <Stack.Screen
          name="AuthorizedProfile"
          component={AuthorizedProfile}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name="LogIn"
            component={LogIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
