import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

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
  const user = useUser();

  return (
    <Stack.Navigator screenOptions={{ headerTitle: "" }}>
      {user ? (
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
