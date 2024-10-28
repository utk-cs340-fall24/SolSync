import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import useUser from "@/hooks/useUser";

import AuthorizedProfile from "./AuthorizedProfile";
import EditProfile from "./EditProfile";
import LogIn from "./Login";
import SignUp from "./SignUp";

export type ProfileStackParamList = {
  LogIn: undefined;
  SignUp: undefined;
  AuthorizedProfile: undefined;
  EditProfile: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function Profile() {
  const { user, userIsLoading } = useUser();

  if (userIsLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#000000" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerTitle: "" }}>
      {user ? (
        <>
          <Stack.Screen
            name="AuthorizedProfile"
            component={AuthorizedProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{ headerShown: false, presentation: "modal" }}
          />
        </>
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
