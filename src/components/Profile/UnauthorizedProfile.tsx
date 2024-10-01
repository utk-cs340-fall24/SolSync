import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// two buttons, one to log in, one to sign up
// export default function UnauthorizedProfile({ navigation }: ) {
//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: "#fff",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text style={{ marginBottom: 15 }}>
//         Unauthorized profile page... ask to sign in or sign up
//       </Text>
//       <Button
//         title="Log In"
//         color="purple"
//         onPress={() => navigation.navigate("LogIn")}
//       />
//       <Button
//         title="Sign Up"
//         color="purple"
//         onPress={() => navigation.navigate("SignUp")}
//       />
//     </View>
//   );
// }

const Stack = createNativeStackNavigator();

export default function UnauthorizedProfile() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ marginBottom: 15 }}>
        Unauthorized profile page... ask to sign in or sign up
      </Text>
      <Button
        title="Log In"
        color="purple"
        onPress={() => navigation.navigate("Login")}
      />
      <Button
        title="Sign Up"
        color="purple"
        onPress={() => navigation.navigate("SignUp")}
      />
    </View>
  );
}

{
  /* <Drawer.Screen name="Login" component={Login} />
<Drawer.Screen name="SignUp" component={SignUp} /> */
}
