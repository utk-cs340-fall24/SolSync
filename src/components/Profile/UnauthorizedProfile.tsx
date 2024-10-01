import { View, Text, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DrawerParamList } from ".";

type UnauthorizedProfileProps = NativeStackScreenProps<
  DrawerParamList,
  "UnauthorizedProfile"
>;

export default function UnauthorizedProfile({
  navigation,
}: UnauthorizedProfileProps) {
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
