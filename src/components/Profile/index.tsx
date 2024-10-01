import React from "react";
import UnauthorizedProfile from "./UnauthorizedProfile";
import AuthorizedProfile from "./AuthorizedProfile";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "../Login";
import SignUp from "../SignUp";

interface ProfileProps {
  isAuthed: boolean;
}

const Drawer = createDrawerNavigator();

export default function Profile({ isAuthed }: ProfileProps) {
  return (
    <Drawer.Navigator>
      {isAuthed ? (
        <Drawer.Screen name="AuthorizedProfile" component={AuthorizedProfile} />
      ) : (
        <Drawer.Screen
          name="UnauthorizedProfile"
          component={UnauthorizedProfile}
        />
      )}
    </Drawer.Navigator>
  );
}
