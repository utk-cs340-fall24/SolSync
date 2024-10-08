import React from "react";
import UnauthorizedProfile from "./UnauthorizedProfile";
import AuthorizedProfile from "./AuthorizedProfile";
import LogIn from "../LogIn";
import SignUp from "../SignUp";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useUser from "@/hooks/useUser";

export type ProfileStackParamList = {
  LogIn: undefined;
  SignUp: undefined;
  AuthorizedProfile: undefined;
  UnauthorizedProfile: undefined;
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
            name="UnauthorizedProfile"
            component={UnauthorizedProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
      )}
    </Stack.Navigator>
  );
}
