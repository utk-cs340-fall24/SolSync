import React from "react";
import UnauthorizedProfile from "./UnauthorizedProfile";
import AuthorizedProfile from "./AuthorizedProfile";
import Login from "../Login";
import SignUp from "../SignUp";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

type ProfileProps = {
  isAuthed: boolean;
};

export type DrawerParamList = {
  Login: undefined;
  SignUp: undefined;
  AuthorizedProfile: undefined;
  UnauthorizedProfile: undefined;
};

const Stack = createNativeStackNavigator<DrawerParamList>();

export default function Profile({ isAuthed }: ProfileProps) {
  return (
    <Stack.Navigator>
      {isAuthed ? (
        <Stack.Screen name="AuthorizedProfile" component={AuthorizedProfile} />
      ) : (
        <>
          <Stack.Screen
            name="UnauthorizedProfile"
            component={UnauthorizedProfile}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
      )}
    </Stack.Navigator>
  );
}
